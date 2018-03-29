export class Media {
  key ?: string;
  public_id: string;
  url: string;
  alt: string;
  type?: string;
  public: boolean;
  extension: string;
  position ?: number;
  cropper ?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  bucket?: string;
  content_type?: string;
  created_at?: string;
  updated_at?: string;
}
