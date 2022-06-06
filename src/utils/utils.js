import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Фунцции для работы с датой
const getHumanDate = ( date ) => dayjs( date ).format( 'MMM DD' );

const getHoursMinute = ( date ) => dayjs( date ).format( 'HH:mm' );

const getDateAndHours = ( date ) => dayjs( date ).format( 'DD/MM/YY HH:mm' );

//Переводит минуты в формат. Пример: 01D 10H 15M
const MINUTES = {
  minutInHour: 60,
  hoursInDay: 24,
  minutInDay: 1440,
};

const getDifferenceDate = ( dateTo, dateFrom ) => {
  const min = dayjs( dateTo ).diff(dateFrom, 'minute' );
  const hours = Math.trunc( min / MINUTES.minutInHour  );
  const minutes = min % MINUTES.minutInHour;
  const days = Math.trunc( hours / MINUTES.hoursInDay );
  const hoursDays = hours % MINUTES.hoursInDay;

  const h = hours < 10 ? `0${ hours }` : hours;
  const m = minutes < 10 ? `0${ minutes }` : minutes;
  const d = days < 10 ? `0${ days }` : days;
  const dh = hoursDays < 10 ? `0${ hoursDays }` : hoursDays;

  if ( min < MINUTES.minutInHour ) {
    return `${ m }M`;
  }

  if ( min >= MINUTES.minutInHour && min < MINUTES.minutInDay ) {
    return `${ h }H ${ m }M`;
  }

  if ( min >= MINUTES.minutInDay ) {
    return `${ d }D ${ dh }H ${ m }M`;
  }
};

//Сортировка данных
const sortDurationDown = ( pointA, pointB ) => dayjs( pointB.dateTo ).diff(pointB.dateFrom, 'minute' ) - dayjs( pointA.dateTo ).diff( pointA.dateFrom, 'minute' );

const sortDateUp = ( dateA, dateB ) => dayjs( dateA.dateFrom ).diff( dateB.dateFrom );

const sortPriceDown = ( priceA, priceB ) => priceB.basePrice - priceA.basePrice;

//Возвращает данные в зависимости от name
const getElement = ( element, data ) => data.find( ({ name }) => element === name );

////Возвращает данные в зависимости от type
const getElementType = ( elementType, typeArray ) => typeArray.find( ({ type }) => elementType === type );

//Проверка на пустоту массива, нахождение по id и получение нового массива
const getItem = ( element, data ) => {
  if ( element.length === 0 ) {
    return element;
  }

  return data.filter(( item ) => {
    const isTrue = element.some(( i ) => i === item.id );
    if ( isTrue ) {
      return item;
    }
  });
};

//Проверка двух массивов на равенство
const isTrueArray = ( array1, array2 ) => {
  if ( array1.length !== array2.length ) {
    return false;
  }

  return !array1.filter(( item ) => !array2.some(( i ) => i === item )).length;
};

const getNumberFromString = ( str ) => Number( str.split('').filter((item) => Number(item)).join('') );

export {
  getRandomInteger,
  getHumanDate,
  getDifferenceDate,
  getHoursMinute,
  getDateAndHours,
  getElement,
  getItem,
  getElementType,
  sortDurationDown,
  sortDateUp,
  sortPriceDown,
  getNumberFromString,
  isTrueArray
};
