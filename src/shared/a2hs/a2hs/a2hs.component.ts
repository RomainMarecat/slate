import { Component, OnInit } from '@angular/core';
import { A2hsService } from '../shared/a2hs.service';

@Component({
  selector: 'app-a2hs',
  templateUrl: './a2hs.component.html',
  styleUrls: ['./a2hs.component.scss']
})
export class A2hsComponent implements OnInit {

  devices: string[] = [
    'isStandalone',
    'isChrome',
    'isExplorer',
    'isExplorer_11',
    'isFirefox',
    'isSafari',
    'isOpera',
    'isEdgeDesktop',
    'isEdgeiOs',
    'isEdgeAndroid',
    'isIOS',
    'isMobile'
  ];

  constructor(public a2hs: A2hsService) {
    // A2HS - START
    a2hs.checkUserAgent();
    a2hs.trackStandalone();
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      a2hs.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      a2hs.deferredPrompt = e;
      a2hs.promptSaved = true;

    });
    window.addEventListener('appinstalled', (evt) => {
      a2hs.trackInstalled();
      // hide the add button
      // a2hs.promptIntercepted = false;
    });
    // A2HS - END
  }

  ngOnInit() {
  }
}
