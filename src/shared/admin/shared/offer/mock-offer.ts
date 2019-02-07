import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

export const mockOffer = {
  key: '546526326',
  price: 10,
  external_url: 'http://superpromo.com/product/32323',
  partner: '6dsf2s3f',
  product: 'qf23df2sc6sdf',
  published: true,
  published_at: Timestamp.now(),
};
