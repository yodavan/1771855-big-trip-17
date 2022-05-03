import { getRandomInteger } from '../utils.js';

const price = [ 222, 400, 45, 78, 90, 145, 278, ];
const type = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant', ];
const dateFrom = [
  '2020-04-11T12:35:56.845Z', '2020-04-11T18:55:56.845Z', '2020-04-11T09:32:56.845Z', '2020-04-11T13:42:56.845Z'
];
const dateTo = [
  '2020-04-12T12:35:56.845Z', '2020-04-12T18:55:56.845Z', '2020-04-12T09:32:56.845Z', '2020-04-12T13:42:56.845Z'
];
const offers = [ [1, 2], [3], [1], [], [2] ];
const destination = [ [1], [2], [3], [4] ];
const favorite = [ true, false ];
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
const dataType = new GeneratePoints( type );
const dataDateFrom = new GeneratePoints( dateFrom );
const dataDateTo = new GeneratePoints( dateTo );
const datafavorite = new GeneratePoints( favorite );
const dataOffers = new GeneratePoints( offers );
const dataDestination = new GeneratePoints( destination );

export const generateDataPoint = () => ({
  basePrice: dataPrice.getData(),
  dateFrom: dataDateFrom.getData(),
  dateTo: dataDateTo.getData(),
  destination: dataDestination.getData(),
  isFavorite: datafavorite.getData(),
  offers: dataOffers.getData(),
  type: dataType.getData(),
});

const offersData = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120,
  },
  {
    id: 2,
    title: 'Choose the radio station',
    price: 60,
  },
  {
    id: 3,
    title: 'Choose',
    price: 12,
  }
];

const destinationData = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      }
    ]
  },
  {
    id: 3,
    description: '',
    name: 'Amsterdam',
    pictures: []
  },
  {
    id: 4,
    description: 'London, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'London',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
    ]
  }
];

export { offersData, destinationData };
