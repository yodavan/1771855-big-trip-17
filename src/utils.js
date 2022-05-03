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
const getDifferenceDate = ( dateTo, dateFrom ) => {
  const min = dayjs( dateTo ).diff(dateFrom, 'minute' );
  const hours = Math.trunc( min / 60 );
  const minutes = min % 60;
  const days = Math.trunc( hours / 24 );
  const hoursDays = hours % 24;

  const h = hours < 10 ? `0${ hours }` : hours;
  const m = minutes < 10 ? `0${ minutes }` : minutes;
  const d = days < 10 ? `0${ days }` : days;
  const dh = hoursDays < 10 ? `0${ hoursDays }` : hoursDays;

  if ( min < 60 ) {
    return `${ m }M`;
  }

  if ( min >= 60 && min < 1440) {
    return `${ h }H ${ m }M`
  }

  if ( min >= 1440 ) {
    return `${ d }D ${ dh }H ${ m }M`
  }
};

//Возвращает данные в зависимости от id
const getElement = ( element, data ) => {
  for ( let item of data ) {
    const isTrue = element.some(( i ) => i === item.id );
    if ( isTrue ) {
      return item
    }
  }
};

export {
  getRandomInteger,
  getHumanDate,
  getDifferenceDate,
  getHoursMinute,
  getDateAndHours,
  getElement
};
