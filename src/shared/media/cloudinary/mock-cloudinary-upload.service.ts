export class MockCloudinaryUploadService {
  constructor() {

  }

  uploadImage(): void {}

  createMedia(): Promise < any > {
    return this.onMediaChange();
  }

  onMediaChange(): Promise < any > {
    return null;
  }

  getSignature(): any {
    return {};
  }
}
