import { Injectable } from '@angular/core';
import { queue } from 'd3-queue';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {
  constructor() {
  }

  getImage(map: Map): Observable<HTMLImageElement> {
    return new Observable<HTMLImageElement>(observer => {
      this.leafletImage(map, (err, canvas) => {
        // now you have canvas
        // example thing to do with that canvas:
        const img = document.createElement('img');
        const dimensions = map.getSize();
        img.width = dimensions.x;
        img.height = dimensions.y;
        img.src = canvas.toDataURL();

        observer.next(img);
        observer.complete();
      });
    });
  }

  leafletImage(map, callback) {
    const cacheBusterDate = +new Date();

    const dimensions = map.getSize();
    const layerQueue = queue(1);

    const canvas = document.createElement('canvas');
    canvas.width = dimensions.x;
    canvas.height = dimensions.y;
    const ctx = canvas.getContext('2d');

    // dummy canvas image when loadTile get 404 error
    // and layer don't have errorTileUrl
    const dummycanvas = document.createElement('canvas');
    dummycanvas.width = 1;
    dummycanvas.height = 1;
    const dummyctx = dummycanvas.getContext('2d');
    dummyctx.fillStyle = 'rgba(0,0,0,0)';
    dummyctx.fillRect(0, 0, 1, 1);

    const drawTileLayer = (l) => {
      if (l instanceof L.TileLayer) {
        layerQueue.defer(handleTileLayer, l);
      } else if (l._heat) {
        layerQueue.defer(handlePathRoot, l._canvas);
      }
    };

    const layersDone = (err, layers) => {
      if (err) {
        throw err;
      }
      layers.forEach((layer) => {
        if (layer && layer.canvas) {
          ctx.drawImage(layer.canvas, 0, 0);
        }
      });
      done();
    };

    const drawMarkerLayer = (l) => {
      if (l instanceof L.Marker && l.options.icon instanceof L.Icon) {
        layerQueue.defer(handleMarkerLayer, l);
      }
    };

    const drawEsriDynamicLayer = (l) => {
      if (!(L as any).esri) {
        return;
      }

      if (l instanceof (L as any).esri.DynamicMapLayer) {
        layerQueue.defer(handleEsriDymamicLayer, l);
      }
    };


    const handlePathRoot = (root, callbackPathRoot) => {
      const bounds = map.getPixelBounds();
      const origin = map.getPixelOrigin();
      const canvasPathRoot = document.createElement('canvas');
      canvasPathRoot.width = dimensions.x;
      canvasPathRoot.height = dimensions.y;
      const ctxPathRoot = canvasPathRoot.getContext('2d');
      const pos = L.DomUtil.getPosition(root).subtract(bounds.min).add(origin);
      try {
        ctxPathRoot.drawImage(root, pos.x, pos.y, canvasPathRoot.width - (pos.x * 2), canvasPathRoot.height - (pos.y * 2));
        callbackPathRoot(null, {
          canvasPathRoot
        });
      } catch (e) {
        console.error('Element could not be drawn on canvas', root); // eslint-disable-line no-console
      }
    };

    // layers are drawn in the same order as they are composed in the DOM:
    // tiles, paths, and then markers
    map.eachLayer(drawTileLayer);
    map.eachLayer(drawEsriDynamicLayer);

    if (map._pathRoot) {
      layerQueue.defer(handlePathRoot, map._pathRoot);
    } else if (map._panes) {
      const firstCanvas = map._panes.overlayPane.getElementsByTagName('canvas').item(0);
      if (firstCanvas) {
        layerQueue.defer(handlePathRoot, firstCanvas);
      }
    }
    map.eachLayer(drawMarkerLayer);
    layerQueue.awaitAll(layersDone);


    const done = () => {
      callback(null, canvas);
    };


    const handleTileLayer = (layer, callbackHandleTileLayer) => {
      // `L.TileLayer.Canvas` was removed in leaflet 1.0
      const isCanvasLayer = ((L.TileLayer as any).Canvas && layer instanceof (L.TileLayer as any).Canvas);
      const canvasHandleTileLayer = document.createElement('canvas');

      canvasHandleTileLayer.width = dimensions.x;
      canvasHandleTileLayer.height = dimensions.y;

      const ctxHandleTileLayer = canvasHandleTileLayer.getContext('2d');
      const bounds = map.getPixelBounds();
      const zoom = map.getZoom();
      const tileSize = layer.options.tileSize;

      if (zoom > layer.options.maxZoom || zoom < layer.options.minZoom) {
        return callbackHandleTileLayer();
      }

      const tileBounds = L.bounds(
        bounds.min.divideBy(tileSize)._floor(),
        bounds.max.divideBy(tileSize)._floor());
      const tiles = [];
      let j;
      let i;
      const tileQueue = queue(1);

      for (j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
        for (i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
          tiles.push(new L.Point(i, j));
        }
      }

      tiles.forEach((tilePoint) => {
        const originalTilePoint = tilePoint.clone();

        if (layer._adjustTilePoint) {
          layer._adjustTilePoint(tilePoint);
        }

        const tilePos = originalTilePoint
          .scaleBy(new L.Point(tileSize, tileSize))
          .subtract(bounds.min);

        if (tilePoint.y >= 0) {
          if (isCanvasLayer) {
            const tile = layer._tiles[tilePoint.x + ':' + tilePoint.y];
            tileQueue.defer(canvasTile, tile, tilePos, tileSize);
          } else {
            const url = addCacheString(layer.getTileUrl(tilePoint));
            tileQueue.defer(loadTile, url, tilePos, tileSize);
          }
        }
      });

      const tileQueueFinish = (err, data) => {
        data.forEach(drawTile);
        callback(null, {canvas});
      };

      tileQueue.awaitAll(tileQueueFinish);

      const canvasTile = (tile, tilePos, tileSizeCanvasTile, callbackCanvasTile) => {
        callbackCanvasTile(null, {
          img: tile,
          pos: tilePos,
          size: tileSizeCanvasTile
        });
      };

      const loadTile = (url, tilePos, tileSizeLoadTile, callbackLoadTile) => {
        const im = new Image();
        im.crossOrigin = '';
        im.onload = () => {
          callbackLoadTile(null, {
            img: this,
            pos: tilePos,
            size: tileSizeLoadTile
          });
        };
        im.onerror = (e) => {
          // use canvas instead of errorTileUrl if errorTileUrl get 404
          if (layer.options.errorTileUrl !== '' && (e as any).target.errorCheck === undefined) {
            (e as any).target.errorCheck = true;
            (e as any).target.src = layer.options.errorTileUrl;
          } else {
            callback(null, {
              img: dummycanvas,
              pos: tilePos,
              size: tileSize
            });
          }
        };
        im.src = url;
      };


      const drawTile = (d) => {
        ctxHandleTileLayer.drawImage(d.img, Math.floor(d.pos.x), Math.floor(d.pos.y),
          d.size, d.size);
      };
    };


    function handleMarkerLayer(marker, callbackMarkerLayer) {
      const canvasMarkerLayer = document.createElement('canvas');
      const ctxMarkerLayer = canvasMarkerLayer.getContext('2d');
      const pixelBounds = map.getPixelBounds();
      const minPoint = new L.Point(pixelBounds.min.x, pixelBounds.min.y);
      const pixelPoint = map.project(marker.getLatLng());
      const isBase64 = /^data\:/.test(marker._icon.src);
      const url = isBase64 ? marker._icon.src : addCacheString(marker._icon.src);
      const im = new Image();
      const options = marker.options.icon.options;
      let size = options.iconSize;
      const pos = pixelPoint.subtract(minPoint);
      const anchor = L.point(options.iconAnchor || size && size.divideBy(2, true));

      if (size instanceof L.Point) {
        size = [size.x, size.y];
      }

      const x = Math.round(pos.x - size[0] + anchor.x);
      const y = Math.round(pos.y - anchor.y);

      canvasMarkerLayer.width = dimensions.x;
      canvasMarkerLayer.height = dimensions.y;
      im.crossOrigin = '';

      im.onload = () => {
        ctxMarkerLayer.drawImage(this as any, x, y, size[0], size[1]);
        callbackMarkerLayer(null, {
          canvas
        });
      };

      im.src = url;

      if (isBase64) {
        im.onload(this);
      }
    }

    const handleEsriDymamicLayer = (dynamicLayer, callbackDynamicLayer) => {
      const canvasDynamicLayer = document.createElement('canvas');
      canvasDynamicLayer.width = dimensions.x;
      canvasDynamicLayer.height = dimensions.y;

      const ctxDynamicLayer = canvasDynamicLayer.getContext('2d');

      const im = new Image();
      im.crossOrigin = '';
      im.src = addCacheString(dynamicLayer._currentImage._image.src);

      im.onload = () => {
        ctxDynamicLayer.drawImage(im, 0, 0);
        callbackDynamicLayer(null, {
          canvasDynamicLayer
        });
      };
    };

    const addCacheString = (url) => {
      // workaround for https://github.com/mapbox/leaflet-image/issues/84
      if (!url) {
        return url;
      }
      // If it's a data URL we don't want to touch this.
      if (isDataURL(url) || url.indexOf('mapbox.com/styles/v1') !== -1) {
        return url;
      }
      return url + ((url.match(/\?/)) ? '&' : '?') + 'cache=' + cacheBusterDate;
    };

    const isDataURL = (url) => {
      // tslint:disable-next-line
      const dataURLRegex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
      return !!url.match(dataURLRegex);
    };
  }
}
