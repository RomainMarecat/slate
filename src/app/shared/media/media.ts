export class Media {
  key: string;
  public_id: string;
  url: string;
  alt: string;
  public: boolean;
  extension: string;
  position: number;
  cropper: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}
