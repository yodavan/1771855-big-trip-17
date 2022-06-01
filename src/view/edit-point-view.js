import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDateAndHours, getElement, getElementType, getNumberFromString } from '../utils.js';
import { destinationData, offersData, typePoints } from '../mock/route-point-data.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


const getText = ( element ) => ( element !== '' ) ? `<p class="event__destination-description">${ element }</p>` : '';

const getPictures = ( array ) => ( array.length ) ?
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${ array.map(({ src, description }) => `<img class="event__photo" src="${ src }" alt="${ description }">`)}
    </div>
  </div>` : '';

const createSection = ({ pictures, description }) => ( !pictures.length && !description ) ? '' :
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${ getText( description ) }
    ${ getPictures( pictures ) }
  </section>`;

const getTypeList = ( item, type ) => `<div class="event__type-item">
                                        <input id="event-type-${ item }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ item }" ${ ( item === type ) ? 'checked' : '' }>
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

export default class EditPointView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor( point ) {
    super();
    this._state = EditPointView.parsePointToState( point );

    this.#setInnerHandlers();
  }

  get template() {
    const { basePrice, type, dateFrom, dateTo, destination, offers } = this._state;
    const dFrom = getDateAndHours( dateFrom );
    const dTo = getDateAndHours( dateTo );
    const destinationCard = createSection( getElement( destination, destinationData ) );
    const typeOffers = createOffers( getElementType( type, offersData ).offers, offers );
    const typeList = typePoints.map(( item ) => getTypeList( item, type )).join('');
    const listDestination = destinationData.map(({ name }) => `<option value=${ name }></option>`).join('');

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ destination }" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${ listDestination }
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ dFrom }" readonly>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ dTo }" readonly>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${ basePrice }">
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

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTypePoint );
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#changeOffer );
    this.element.querySelector( '#event-destination-1' ).addEventListener( 'change', this.#changeDestination );
    this.element.querySelector( '#event-price-1' ).addEventListener( 'input', this.#changePrice );
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  setClickCloseEditPopup = ( callback ) => {
    this._callback.closeEditPopup = callback;
    this.element.querySelector( '.event__rollup-btn' ).addEventListener( 'click', this.#closeEditPopup );
  };

  setFormSubmitHandler = ( callback ) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = ( callback ) => {
    this._callback.pointDelete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteHandler);
  };

  #pointDeleteHandler = ( evt ) => {
    evt.preventDefault();
    this._callback.pointDelete( EditPointView.parseStateToPoint( this._state ) );
  };

  #formSubmitHandler = ( evt ) => {
    evt.preventDefault();

    if ( new Date( this._state.dateFrom ) > new Date( this._state.dateTo ) ) {
      this.element.querySelector('#event-end-time-1').style.border = '1px solid red';
      return;
    }

    this._callback.formSubmit( EditPointView.parseStateToPoint( this._state ) );
  };

  #closeEditPopup = () => {
    this._callback.closeEditPopup();
  };

  #changeTypePoint = ( evt ) => {
    if ( evt.target.classList.contains('event__type-input') ) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #changeOffer = ( evt ) => {
    if ( evt.target.classList.contains('event__offer-checkbox')  ) {
      const isTrue = this._state.offers.includes(getNumberFromString( evt.target.id ));
      const numberId = getNumberFromString( evt.target.id );

      this._setState({
        offers: !isTrue ? [...this._state.offers, numberId] : this._state.offers.filter(( item ) => item !== numberId ),
      });
    }
  };

  #changeDestination = ( evt ) => {
    const isTrue = destinationData.some(({ name }) => name === evt.target.value );

    if ( !isTrue ) {
      evt.target.value = this._state.destination;
      return;
    }

    this.updateElement({
      destination: evt.target.value,
    });
  };

  #changePrice = ( evt ) => {
    const buttonSubmit = this.element.querySelector('.event__save-btn');

    if ( !Number( evt.target.value ) ) {
      buttonSubmit.disabled = true;
      return;
    }

    buttonSubmit.disabled = false;
    this._setState({
      basePrice: Number( evt.target.value ),
    });
  };

  #changeDateFromHandler = ( [ selectedDates ] ) => {
    this.updateElement({
      dateFrom: selectedDates,
      isDateFrom: selectedDates,
    });
  };

  #changeDateToHandler = ([ selectedDates ]) => {
    this.updateElement({
      dateTo: selectedDates,
      isDateTo: selectedDates,
    });
  };

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        disableMobile: true,
        minDate: 'today',
        maxDate: `${ !this._state.isDateTo ? '' : getDateAndHours( this._state.dateTo ) }`,
        onChange: this.#changeDateFromHandler,
      }
    );
  };

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        disableMobile: true,
        minDate: `${ !this._state.isDateFrom ? 'today' : getDateAndHours( this._state.dateFrom )}`,
        onChange: this.#changeDateToHandler,
      }
    );
  };

  removeElement = () => {
    super.removeElement();

    if ( this.#datepickerFrom || this.#datepickerTo ) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;

      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset = ( point ) => {
    this.updateElement(
      EditPointView.parsePointToState( point ),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClickCloseEditPopup( this._callback.closeEditPopup );
    this.setFormSubmitHandler( this._callback.formSubmit );
    this.setDeleteClickHandler( this._callback.pointDelete );
  };

  static parsePointToState = ( point ) => ({ ...point, isDateFrom: '', isDateTo: '' });

  static parseStateToPoint = ( state ) => {
    const point = { ...state };

    delete point.isDateFrom;
    delete point.isDateTo;

    return point;
  };
}
