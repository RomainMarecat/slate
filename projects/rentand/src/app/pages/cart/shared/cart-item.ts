import { Mono } from '../../../shared/interfaces/mono';
import { Session } from '../../../shared/interfaces/session';

export class CartItem {
  _id?: string | any;
  session?: any;
}

export class CartMonoItem {
  mono: Mono;
  item: Session;
}
