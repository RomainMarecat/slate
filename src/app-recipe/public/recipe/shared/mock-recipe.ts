import * as faker from 'faker';
import { Recipe } from './recipe';
import { mockIngredient, mockIngredient2, mockIngredient3, mockIngredients } from '../../ingredient/shared/mock-ingredient';

export const mockRecipe: Recipe = {
  key: faker.random.number({min: 1, max: 9999999}).toString(10),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: '01:00',
  cook_time: '01:00',
  prep_time: '01:00',
  waiting_time: '01:00',
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: mockIngredients,
  search_ingredients: mockIngredients.map(i => i.name),
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3),
  on_homepage: faker.random.boolean(),
  preparations: [
    {
      quantity: faker.random.number(10),
      ingredient: mockIngredient,
      sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
    },
    {
      quantity: faker.random.number(10),
      ingredient: mockIngredient,
      sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
    },
    {
      quantity: faker.random.number(10),
      ingredient: mockIngredient,
      sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
    },
    {
      quantity: faker.random.number(10),
      ingredient: mockIngredient,
      sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
    }
  ],
  instructions: [
    {
      order_index: 1,
      sentence: 'Préchauffer le four à 180° C.',
      ingredients: [
        mockIngredient,
        mockIngredient3
      ],
      image: ''
    },
    {
      order_index: 2,
      sentence: 'Lavez les tomates. <br> Découpez un chapeau à chacune et videz-les à l’aide d’une cuillère.',
      image: ''
    },
    {
      order_index: 3,
      sentence: 'Pelez les gousses d’ail et l’oignon, laver le persil.',
      ingredients: [
        mockIngredient
      ],
      image: ''
    },
    {
      order_index: 4,
      sentence: 'Envoyer au four en suivant le termostat.',
      image: ''
    },
    {
      order_index: 5,
      sentence: 'Sortir du four et assaisoner le tout.',
      ingredients: [
        mockIngredient,
        mockIngredient2,
        mockIngredient3
      ],
      image: ''
    },
  ]
};

export const mockRecipes: Recipe[] = [
  {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  }, {
    key: faker.random.number({min: 1, max: 9999999}).toString(10),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    total_time: '01:00',
    cook_time: '01:00',
    prep_time: '01:00',
    waiting_time: '01:00',
    cuisine_type: faker.commerce.productMaterial(),
    creator: faker.name.findName(),
    image: '',
    color: faker.internet.color(),
    ingredients: [],
    search_ingredients: [],
    yield: faker.random.number({min: 1, max: 12}),
    rating: faker.random.number(3),
    on_homepage: faker.random.boolean(),
    preparations: [
      {
        quantity: faker.random.number(10),
        ingredient: mockIngredient,
        sentence: `<strong>{{quantity}} kg</strong> de {{ingredient}}`
      }
    ]
  },
];
