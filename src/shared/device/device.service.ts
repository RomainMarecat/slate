import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  private extraSmallScreenUp = 481;
  private smallScreenUp = 769;
  private mediumScreenUp = 1025;
  private largeScreenUp = 1441;
  private extraLargeScreenUp = 2561;
  private extraSmallScreen = 480;
  private smallScreen = 768;
  private mediumScreen = 1024;
  private largeScreen = 1440;
  private extraLargeScreen = 2560;

  constructor() {}

  isSmallAndUp(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.extraSmallScreenUp) {
        return true;
      }
    }

    return false;
  }

  isMediumAndUp(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.smallScreenUp) {
        return true;
      }
    }
    return false;
  }

  isLargeAndUp(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.mediumScreenUp) {
        return true;
      }
    }
    return false;
  }

  isExtraLargeAndUp(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.largeScreenUp) {
        return true;
      }
    }
    return false;
  }

  isExtraSmallAndDown(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth <= this.extraSmallScreen) {
        return true;
      }
    }
    return false;
  }

  isSmallAndDown(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth <= this.smallScreen) {
        return true;
      }
    }
    return false;
  }

  isMediumAndDown(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth <= this.mediumScreen) {
        return true;
      }
    }
    return false;
  }

  isLargeAndDown(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth <= this.largeScreen) {
        return true;
      }
    }
    return false;
  }

  isSmallOnly(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.extraSmallScreenUp &&
        window.innerWidth <= this.smallScreen) {
        return true;
      }
    }
    return false;
  }

  isMediumOnly(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.smallScreenUp &&
        window.innerWidth <= this.mediumScreen) {
        return true;
      }
    }
    return false;
  }

  isLargeOnly(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.mediumScreenUp &&
        window.innerWidth <= this.largeScreen) {
        return true;
      }
    }
    return false;
  }

  isExtraLargeOnly(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth >= this.largeScreenUp &&
        window.innerWidth <= this.extraLargeScreen) {
        return true;
      }
    }
    return false;
  }
}
