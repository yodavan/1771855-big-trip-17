import { getRandomInteger } from '../utils/utils.js';
import { nanoid } from 'nanoid';

const price = [ 222, 400, 45, 78, 90, 145, 278, ];
const typePoints = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant' ];
const dateFrom = [
  '2020-04-09T12:35:56.845Z', '2020-04-10T18:55:56.845Z', '2020-04-11T09:32:56.845Z', '2020-04-08T13:42:56.845Z'
];
const dateTo = [
  '2020-04-12T12:35:56.845Z', '2020-04-13T18:55:56.845Z', '2020-04-14T09:32:56.845Z', '2020-04-15T13:42:56.845Z'
];
const offers = [ [1, 2, 5], [3, 4], [1], [], [2, 3, 4] ];
const destination = [ 'Chamonix', 'Geneva', 'Amsterdam', 'London', 'Saint-Petersburg' ];
const favorite = [ true, false ];
const offersData = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 50,
      },
      {
        id: 3,
        title: 'Choose',
        price: 12,
      },
      {
        id: 4,
        title: 'radio station',
        price: 64,
      },
      {
        id: 5,
        title: 'Upgrade to a',
        price: 8,
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade',
        price: 10,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 34,
      },
      {
        id: 3,
        title: 'Choose bollt hikkr',
        price: 22,
      },
      {
        id: 4,
        title: 'radio station',
        price: 40,
      },
      {
        id: 5,
        title: 'Upgrade to ahlokitrfj',
        price: 123,
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade',
        price: 10,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 34,
      },
      {
        id: 3,
        title: 'Choose bollt hikkr',
        price: 22,
      },
      {
        id: 4,
        title: 'radio station',
        price: 40,
      },
      {
        id: 5,
        title: 'Upgrade to ahlokitrfj',
        price: 123,
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade jolp',
        price: 1043,
      },
      {
        id: 2,
        title: 'Choose the radi',
        price: 34,
      },
      {
        id: 3,
        title: 'Choose bollt hikkr ftghu',
        price: 2267,
      },
      {
        id: 4,
        title: 'station',
        price: 4,
      },
      {
        id: 5,
        title: 'Upgrade to ahlokitrfj',
        price: 12389,
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade jolp',
        price: 103,
      },
      {
        id: 2,
        title: 'Choose the radi',
        price: 344,
      },
      {
        id: 3,
        title: 'Choose bollt hikkr ftghu',
        price: 267,
      },
      {
        id: 4,
        title: 'station',
        price: 42,
      },
      {
        id: 5,
        title: 'Upgrade to ahlokitrfj',
        price: 129,
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'jolp',
        price: 13,
      },
      {
        id: 2,
        title: 'the radi',
        price: 44,
      },
      {
        id: 3,
        title: 'Cbollt hikkr ftghu',
        price: 26,
      },
      {
        id: 4,
        title: 'station',
        price: 42,
      },
      {
        id: 5,
        title: 'Upgrade to ahlokitrfj',
        price: 129,
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'jolp kltkjh',
        price: 13,
      },
      {
        id: 2,
        title: 'the',
        price: 4478,
      },
      {
        id: 3,
        title: 'Cbollt hikkr ftghu ktjvj;.szj',
        price: 246,
      },
      {
        id: 4,
        title: 'station hgvjih i5jrrii',
        price: 4267,
      },
      {
        id: 5,
        title: 'Upgrade',
        price: 1296,
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'jolp kltkjh',
        price: 135,
      },
      {
        id: 2,
        title: 'the',
        price: 44,
      },
      {
        id: 3,
        title: 'Cbollt hikkr ftghu ktjvj;.szj',
        price: 2467,
      },
      {
        id: 4,
        title: 'station hgvjih i5jrrii',
        price: 42,
      },
      {
        id: 5,
        title: 'Upgrade',
        price: 12969,
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'jolp',
        price: 135,
      },
      {
        id: 2,
        title: 'the',
        price: 44,
      },
      {
        id: 3,
        title: 'Cbollt',
        price: 2467,
      },
      {
        id: 4,
        title: 'station',
        price: 42,
      },
      {
        id: 5,
        title: 'Upgrade',
        price: 12969,
      },
    ]
  },
];
const destinationData = [
  {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    description: '',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Chamonix parliament building',
      }
    ]
  },
  {
    description: '',
    name: 'Amsterdam',
    pictures: []
  },
  {
    description: 'London, is a beautiful city, a true asian pearl, with crowded streets.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'London',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163314',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163312',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163313',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163311',
        description: 'Chamonix parliament building',
      },
    ]
  },
  {
    description: 'Saint-Petersburg, is a beautiful city, a true asian pearl, with crowded streets.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Saint-Petersburg',
    pictures: []
  }
];

class GeneratePoints {
  constructor( data ) {
    this.data = data;
  }

  getData() {
    const randomData = getRandomInteger(0, this.data.length - 1);
    return this.data[ randomData ];
  }
}

const dataPrice = new GeneratePoints( price );
const dataType = new GeneratePoints( typePoints );
const dataDateFrom = new GeneratePoints( dateFrom );
const dataDateTo = new GeneratePoints( dateTo );
const datafavorite = new GeneratePoints( favorite );
const dataOffers = new GeneratePoints( offers );
const dataDestination = new GeneratePoints( destination );

const generateDataPoint = () => ({
  id: nanoid(),
  basePrice: dataPrice.getData(),
  dateFrom: dataDateFrom.getData(),
  dateTo: dataDateTo.getData(),
  destination: dataDestination.getData(),
  isFavorite: datafavorite.getData(),
  offers: dataOffers.getData(),
  type: dataType.getData(),
});

export {
  generateDataPoint,
  offersData,
  destinationData,
  typePoints
};
