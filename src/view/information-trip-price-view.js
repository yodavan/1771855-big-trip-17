import AbstractView from '../framework/view/abstract-view.js';
import { getItem, getElementType, getHumanDate } from '../utils/utils.js';
import { offersData } from '../mock/route-point-data.js';

const getSortedArrayDateFrom = ( data ) => {
  const array = [...data];
  return array.sort(( a, b ) => new Date( a.dateFrom ) - new Date( b.dateFrom ));
};

const getSortedArrayDateTo = ( data ) => {
  const array = [...data];
  return array.sort(( a, b ) => new Date( a.dateTo ) - new Date( b.dateTo ));
};

const getUniqueValuePoint  = ( data ) => {
  const array = getSortedArrayDateFrom( data );
  const arrayDestination = array.map(( item ) => item.destination );

  return arrayDestination.filter(( item, index ) => index === arrayDestination.indexOf( item ));
};

const getMarkupPoint = ( data ) => {
  const uniqValue = getUniqueValuePoint( data );

  if ( uniqValue.length === 1 ) {
    return `${ uniqValue[ 0 ] }`;
  }
  if ( uniqValue.length === 2 ) {
    return `${ uniqValue[ 0 ] } &mdash; ${ uniqValue[ 1 ] }`;
  }
  if ( uniqValue.length === 3 ) {
    return `${ uniqValue[ 0 ] } &mdash; ${ uniqValue[ 1 ] } &mdash; ${ uniqValue[ 2 ] }`;
  }
  if ( uniqValue.length > 3 ) {
    return `${ uniqValue[ 0 ] } &mdash; ... &mdash; ${ uniqValue[ uniqValue.length - 1 ] }`;
  }
};

const getFirstLastDate = ( data ) => {
  const sortArrayFrom = getSortedArrayDateFrom( data );
  const sortArrayTo = getSortedArrayDateTo( data );
  const dateFrom = sortArrayFrom.map(( item ) => item.dateFrom);
  const dateTo = sortArrayTo.map(( item ) => item.dateTo);

  return [ getHumanDate( dateFrom[ 0 ] ), getHumanDate( dateTo[ dateFrom.length - 1 ] )];
};

const getInformationTrip = ( data ) => ( data.length !== 0 ) ?
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${ getMarkupPoint( data ) }</h1>
    <p class="trip-info__dates">${ getFirstLastDate( data )[0] }&nbsp;&mdash;&nbsp;${ getFirstLastDate( data )[1] }</p>
  </div>` : '';

const getOffersAmount = ( data ) => {
  let i = 0;
  data.forEach(({ type, offers }) => {
    const array = getItem( offers, getElementType( type, offersData ).offers );
    for ( const { price } of array ) {
      i += price ;
    }
  });
  return i;
};

const getPrice = ( data ) => data.reduce(( accum, { basePrice } ) => accum + basePrice, 0);

const getTripAmount = ( data ) => ( data.length !== 0 ) ?
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${ getPrice( data ) + getOffersAmount( data ) }</span>
  </p>` : '';

export default class InformationTripPriceView extends AbstractView {

  constructor( data ) {
    super();
    this.data = data;
  }

  get template() {
    const tripAmount = getTripAmount( this.data );
    const informationTrip = getInformationTrip( this.data );

    return `<section class="trip-main__trip-info  trip-info">
              ${ informationTrip }
              ${ tripAmount }
            </section>`;
  }
}
