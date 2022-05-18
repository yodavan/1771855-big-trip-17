import AbstractView from '../framework/view/abstract-view.js';
import { getHumanDate, getDifferenceDate, getHoursMinute, getElement, getItem, getElementType } from '../utils.js';
import { offersData, destinationData } from '../mock/route-point-data.js';

const createItem = ( item ) => `<li class="event__offer">
                                  <span class="event__offer-title">${ item.title }</span>
                                  &plus;&euro;&nbsp;
                                  <span class="event__offer-price">${ item.price }</span>
                                </li>`;

const createElementList = ( array ) => ( array.length !== 0 ) ?
  `<ul class="event__selected-offers">
    ${ array.map( (item) => createItem(item) ).join('') }
  </ul>` : '';

export default class NewItemCardTrip extends AbstractView {

  constructor( point ) {
    super();
    this.point = point;
  }

  get template() {
    const { basePrice, type, dateFrom, dateTo, offers, isFavorite, destination } = this.point;
    const date = getHumanDate( dateFrom );
    const favorite = isFavorite === true ? 'active' : '';
    const newList = createElementList( getItem( offers, getElementType( type, offersData ).offers ) );
    const name = getElement( destination, destinationData ).name;

    return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${ date }</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${ type }.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${ type } ${ name }</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${ getHoursMinute( dateFrom ) }</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${ getHoursMinute( dateTo ) }</time>
                  </p>
                  <p class="event__duration">${ getDifferenceDate( dateTo, dateFrom ) }</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${ newList }
                <button class="event__favorite-btn event__favorite-btn--${ favorite }" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  setEditClickHandler = ( callback ) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = ( evt ) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = ( evt ) => {
    evt.preventDefault();
    this._callback.favoriteClick( this.point );
  };
}
