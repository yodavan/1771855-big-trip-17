import AbstractView from '../framework/view/abstract-view.js';
import { getDateAndHours, getElement, getElementType } from '../utils.js';
import { destinationData, offersData, typePoints } from '../mock/route-point-data.js';

const getText = ( element ) => ( element !== '' ) ? `<p class="event__destination-description">${ element }</p>` : '';

const getPictures = ( array ) => ( array.length ) ?
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${ array.map(({ src, description }) => `<img class="event__photo" src="${ src }" alt="${ description }">`)}
    </div>
  </div>` : '';

const createSection = ( item ) => ( item.pictures.length === 0 && item.description === '' ) ? '' :
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${ getText( item.description ) }
    ${ getPictures( item.pictures ) }
  </section>`;

const getTypeList = ( item ) => `<div class="event__type-item">
                                  <input id="event-type-${ item }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ item }">
                                  <label class="event__type-label  event__type-label--${ item }" for="event-type-${ item }-1">${ item }</label>
                                </div>`;

const getOfferItem = ( item, offers ) => `<div class="event__offer-selector">
                                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${ item.id }" type="checkbox" name="event-offer-luggage" ${ ( offers.some(( i ) => i === item.id ) ) ? 'checked' : ''}>
                                            <label class="event__offer-label" for="event-offer-luggage-${ item.id }">
                                              <span class="event__offer-title">${ item.title }</span>
                                              &plus;&euro;&nbsp;
                                              <span class="event__offer-price">${ item.price }</span>
                                            </label>
                                          </div>`;

const createOffers = ( array, offers ) => ( array.length !== 0 ) ?
  `<div class="event__available-offers">${ array.map(( item ) => getOfferItem( item, offers )).join('') }</div>` : '';

export default class NewEditPoint extends AbstractView {

  constructor( point ) {
    super();
    this.point = point;
  }

  get template() {
    const { basePrice, type, dateFrom, dateTo, destination, offers } = this.point;
    const dFrom = getDateAndHours( dateFrom );
    const dTo = getDateAndHours( dateTo );
    const name = getElement( destination, destinationData ).name;
    const destinationCard = createSection( getElement( destination, destinationData ) );
    const typeOffers = createOffers( getElementType( type, offersData ).offers, offers );
    const typeList = typePoints.map(( item ) => getTypeList( item )).join('');


    return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${ typeList }
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${ type }</label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ name }" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ dFrom }">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ dTo }">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ basePrice }">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${ typeOffers }
                  </section>

                  ${ destinationCard }
                </section>
              </form>
            </li`;
  }

  setFormSubmitHandler = ( callback ) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector( '.event__rollup-btn' ).addEventListener( 'click', this.#formSubmitHandler );
  };

  #formSubmitHandler = ( evt ) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };
}
