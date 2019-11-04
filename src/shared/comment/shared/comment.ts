export interface Comment {
  key?: string;
  commentText: string;
  commentTime: Date | string;
  creator: string;
  // Entity key storage
  entity_key: string;
  // Entity type where the comment locate
  entity_type: string;
  order: number;
  avatar?: string;
}
