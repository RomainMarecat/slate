import { Injectable } from '@angular/core';

@Injectable()
export class Favicon {

  constructor() { }

  addLink(type: string, href: string) {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'icon');
    linkElement.setAttribute('type', type);
    linkElement.setAttribute('href', href);
    document.head.appendChild(linkElement);
  }
}
