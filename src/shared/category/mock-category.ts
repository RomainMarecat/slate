import { Category } from './category';
import * as faker from 'faker';

export const mockCategory = {
  name: 'Jam',
  description: 'High School',
  translations: {
    fr: 'Jam'
  }
};

export const mockStoreCategories: Category[] = [
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat1.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat2.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat1.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat2.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat1.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat2.jpg'
  },
  {
    key: faker.random.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    translations: {
      fr: faker.commerce.product()
    },
    image: '/assets/images/category/cat2.jpg'
  },
];

export const mockGroupFamily = [
  {
    name: 'Sport',
    categories: [
      {
        name: 'Salle de sport',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Football',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Basketball',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Boxe',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Running',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Ski',
        translations: {
          fr: ''
        },
        description: '',
      }
    ]
  }, {
    name: 'Vacances et Voyages',
    categories: [
      {
        name: 'Location voitures',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Location hébergement',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Hotels',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Campings',
        translations: {
          fr: ''
        },
        description: '',
      }
    ]
  }, {
    name: 'Loisirs',
    categories: [
      {
        name: 'Parcs',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Cinémas',
        translations: {
          fr: ''
        },
        description: '',
      }, {
        name: 'Pass Laser Game',
        translations: {
          fr: ''
        },
        description: '',
      }
    ]
  }
];
