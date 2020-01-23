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
        var img = document.createElement('img');
        var dimensions = map.getSize();
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

    const dimensions = map.getSize(),
      layerQueue = queue(1);

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

    function drawTileLayer(l) {
      if (l instanceof L.TileLayer) layerQueue.defer(handleTileLayer, l);
      else if (l._heat) layerQueue.defer(handlePathRoot, l._canvas);
    }

    function drawMarkerLayer(l) {
      if (l instanceof L.Marker && l.options.icon instanceof L.Icon) {
        layerQueue.defer(handleMarkerLayer, l);
      }
    }

    /**
     *
     * @param l
     */
    function drawEsriDynamicLayer(l) {
      if (!(L as any).esri) return;

      if (l instanceof (L as any).esri.DynamicMapLayer) {
        layerQueue.defer(handleEsriDymamicLayer, l);
      }
    }

    function done() {
      callback(null, canvas);
    }

    function layersDone(err, layers) {
      if (err) throw err;
      layers.forEach(function (layer) {
        if (layer && layer.canvas) {
          ctx.drawImage(layer.canvas, 0, 0);
        }
      });
      done();
    }

    function handleTileLayer(layer, callback) {
      // `L.TileLayer.Canvas` was removed in leaflet 1.0
      const isCanvasLayer = ((L.TileLayer as any).Canvas && layer instanceof (L.TileLayer as any).Canvas),
        canvas = document.createElement('canvas');

      canvas.width = dimensions.x;
      canvas.height = dimensions.y;

      const ctx = canvas.getContext('2d'),
        bounds = map.getPixelBounds(),
        zoom = map.getZoom(),
        tileSize = layer.options.tileSize;

      if (zoom > layer.options.maxZoom || zoom < layer.options.minZoom) {
        return callback();
      }

      let tileBounds = L.bounds(
        bounds.min.divideBy(tileSize)._floor(),
        bounds.max.divideBy(tileSize)._floor()),
        tiles = [],
        j, i,
        tileQueue = queue(1);

      for (j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
        for (i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
          tiles.push(new L.Point(i, j));
        }
      }

      tiles.forEach(function (tilePoint) {
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

      tileQueue.awaitAll(tileQueueFinish);

      function canvasTile(tile, tilePos, tileSize, callback) {
        callback(null, {
          img: tile,
          pos: tilePos,
          size: tileSize
        });
      }

      function loadTile(url, tilePos, tileSize, callback) {
        const im = new Image();
        im.crossOrigin = '';
        im.onload = function () {
          callback(null, {
            img: this,
            pos: tilePos,
            size: tileSize
          });
        };
        im.onerror = function (e) {
          // use canvas instead of errorTileUrl if errorTileUrl get 404
          if (layer.options.errorTileUrl != '' && (e as any).target.errorCheck === undefined) {
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
      }

      function tileQueueFinish(err, data) {
        data.forEach(drawTile);
        callback(null, {canvas: canvas});
      }

      function drawTile(d) {
        ctx.drawImage(d.img, Math.floor(d.pos.x), Math.floor(d.pos.y),
          d.size, d.size);
      }
    }

    function handlePathRoot(root, callback) {
      const bounds = map.getPixelBounds(),
        origin = map.getPixelOrigin(),
        canvas = document.createElement('canvas');
      canvas.width = dimensions.x;
      canvas.height = dimensions.y;
      const ctx = canvas.getContext('2d');
      const pos = L.DomUtil.getPosition(root).subtract(bounds.min).add(origin);
      try {
        ctx.drawImage(root, pos.x, pos.y, canvas.width - (pos.x * 2), canvas.height - (pos.y * 2));
        callback(null, {
          canvas: canvas
        });
      } catch (e) {
        console.error('Element could not be drawn on canvas', root); // eslint-disable-line no-console
      }
    }

    function handleMarkerLayer(marker, callback) {
      const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        pixelBounds = map.getPixelBounds(),
        minPoint = new L.Point(pixelBounds.min.x, pixelBounds.min.y),
        pixelPoint = map.project(marker.getLatLng()),
        isBase64 = /^data\:/.test(marker._icon.src),
        url = isBase64 ? marker._icon.src : addCacheString(marker._icon.src),
        im = new Image(),
        options = marker.options.icon.options;
      let size = options.iconSize;
      const pos = pixelPoint.subtract(minPoint),
        anchor = L.point(options.iconAnchor || size && size.divideBy(2, true));

      if (size instanceof L.Point) size = [size.x, size.y];

      const x = Math.round(pos.x - size[0] + anchor.x),
        y = Math.round(pos.y - anchor.y);

      canvas.width = dimensions.x;
      canvas.height = dimensions.y;
      im.crossOrigin = '';

      im.onload = function () {
        ctx.drawImage(this as any, x, y, size[0], size[1]);
        callback(null, {
          canvas: canvas
        });
      };

      im.src = url;

      if (isBase64) {
        im.onload(this);
      }
    }

    function handleEsriDymamicLayer(dynamicLayer, callback) {
      const canvas = document.createElement('canvas');
      canvas.width = dimensions.x;
      canvas.height = dimensions.y;

      const ctx = canvas.getContext('2d');

      const im = new Image();
      im.crossOrigin = '';
      im.src = addCacheString(dynamicLayer._currentImage._image.src);

      im.onload = function () {
        ctx.drawImage(im, 0, 0);
        callback(null, {
          canvas: canvas
        });
      };
    }

    function addCacheString(url) {
      // workaround for https://github.com/mapbox/leaflet-image/issues/84
      if (!url) return url;
      // If it's a data URL we don't want to touch this.
      if (isDataURL(url) || url.indexOf('mapbox.com/styles/v1') !== -1) {
        return url;
      }
      return url + ((url.match(/\?/)) ? '&' : '?') + 'cache=' + cacheBusterDate;
    }

    function isDataURL(url) {
      const dataURLRegex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
      return !!url.match(dataURLRegex);
    }
  };
}
