import { Product } from './product';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export const mockProduct: Product = {
  name: 'Apple iPhone XS - 64 Go - Gris Sidéral',
  brand: 'Apple',
  score: 4,
  created_at: new Date(),
  published_at: Timestamp.now(),
  url: 'key',
  thumbnail: '',
  images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/image/AppleInc/aos/published/images/i/' +
  'ph/iphone/compare/iphone-compare-models-201809?wid=282&hei=383&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535588384763'],
  image1: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/image/AppleInc/aos/published/images/i/' +
    'ph/iphone/compare/iphone-compare-models-201809?wid=282&hei=383&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535588384763',
  image2: '',
  image3: '',
  price: 979,
  quantity: 10,
  published: true,
  delivery_fee: 0,
  delivery_free: true,
  reseller: '',
  offers: ['kjolpm656', 'jx6vff65s6'],
  key: 's56F656TBFB63265RG989G',
  /* tslint:disable */
  description: `Le plus grand écran jamais vu sur un iPhone. Un design tout en verre ultra-résistant. 
  Encore plus résistant à l’eau et à la poussière. Face ID est encore plus avancé et reconnaît votre visage 
  en un claquement de doigts. Un double appareil photo toujours performant avec contrôle de profondeur et 
  la meilleure qualité vidéo jamais vue sur un smartphone. La plus puissante et intelligente des puces de smartphone A12 Bionic.
   Chargement sans fil plus rapide. 4G LTE Advanced et un son stéréo plus ample`,
  /* tslint:enable */
  short_description: 'Un design tout écran. La meilleure autonomie jamais vue sur un iPhone. ' +
    'Des performances ultra-rapides. Et des photos de qualité studio.',
  user: '',
  creator: '',
  external_url: '',
};

export const mockHomeProductNewer: Product[] = [
  {
    name: 'Apple iPhone XS - 64 Go - Gris Sidéral',
    brand: 'Apple',
    score: 1,
    created_at: new Date(),
    published_at: Timestamp.now(),
    url: 'key',
    description: '',
    thumbnail: '',
    images: [],
    image1: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/image/AppleInc/aos/published/images/i/' +
      'ph/iphone/compare/iphone-compare-models-201809?wid=282&hei=383&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535588384763',
    image2: '',
    image3: '',
    novelty: true,
    price: 979,
    quantity: 10,
    published: true,
    delivery_fee: 0,
    delivery_free: true,
    reseller: '',
    short_description: 'Un design tout écran. La meilleure autonomie jamais vue sur un iPhone. ' +
      'Des performances ultra-rapides. Et des photos de qualité studio.',
    offers: ['kjolpm656', 'jx6vff65s6'],
    key: 's56F656TBFB63265RG989G',
    user: '',
    creator: '',
    external_url: '',
  },
  {
    name: 'MacBook Pro 15 Touch Bar - 512 Go - Gris Sidéral',
    score: 1,
    created_at: new Date(),
    published_at: Timestamp.now(),
    url: 'key',
    description: '',
    thumbnail: '',
    images: [],
    image1: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp15touch/' +
      'space/mbp15touch-space-select-201807_GEO_EMEA_LANG_FR?wid=452&hei=420&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1531167672924',
    image2: '',
    image3: '',
    price: 3299,
    quantity: 10,
    published: true,
    delivery_fee: 0,
    delivery_free: true,
    reseller: '',
    offers: ['kjolpm656', 'jx6vff65s6'],
    key: 'a65F545dD485412REVD',
    user: '',
    creator: '',
    external_url: '',
  },
  {
    name: 'MacBook Air - 256 Go - Gris sidéral',
    score: 5,
    brand: 'Apple',
    created_at: new Date(),
    published_at: Timestamp.now(),
    url: 'product/a65F545dD485412REVD',
    description: 'Processeur Intel Core i5 bicœur de 8e génération à 1,6 GHz (Turbo Boost jusqu’à 3,6 GHz)\n' +
      'Écran Retina\n' +
      '8 Go de mémoire LPDDR3 à 2 133 MHz\n' +
      'SSD de 128 Go\n' +
      'Intel UHD Graphics 617\n' +
      'Touch ID\n' +
      'Trackpad Force Touch\n' +
      'Deux ports Thunderbolt 3\n' +
      'Clavier rétroéclairé - Français\n' +
      'Matériel\n',
    thumbnail: '',
    images: [],
    image1: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/' +
      'air/macbook-air-space-gray-config-201810?wid=539&hei=312&fmt=jpeg&qlt=95&.v=1539386809517',
    image2: '',
    image3: '',
    price: 1349,
    quantity: 50,
    published: true,
    delivery_fee: 0,
    delivery_free: true,
    reseller: '',
    offers: ['kjolpm656', 'jx6vff65s6'],
    key: 'a65F545dD46f5ds6bnfds54fds59n',
    user: '',
    creator: '',
    external_url: '',
  }
];

export const mockInvoiceProducts: Product[] = [
  {
    name: 'Apple Iphone 8 plus 64Go',
    score: 1,
    created_at: new Date(),
    published_at: Timestamp.now(),
    url: 'key',
    description: '',
    thumbnail: '',
    images: [],
    image1: '',
    image2: '',
    image3: '',
    price: 799,
    quantity: 2,
    published: true,
    delivery_fee: 1,
    delivery_free: true,
    reseller: '',
    offers: ['kjolpm656', 'jx6vff65s6'],
    key: 's56F656TBFB63265RG989G',
    user: '',
    creator: '',
    external_url: '',
  },
  {
    name: 'Macbook Pro 15" 512Go',
    score: 1,
    created_at: new Date(),
    published_at: Timestamp.now(),
    url: 'key',
    description: '',
    thumbnail: '',
    images: [],
    image1: '',
    image2: '',
    image3: '',
    price: 2399,
    quantity: 1,
    published: true,
    delivery_fee: 1,
    delivery_free: true,
    reseller: '',
    offers: ['kjolpm656', 'jx6vff65s6'],
    key: 'a65F545dD485412REVD',
    user: '',
    creator: '',
    external_url: '',
  }
];
