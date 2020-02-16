export interface Payment {
  id: string;
  token: any;
  order?: string;
  created_at: Date;
  updated_at: Date;
}
