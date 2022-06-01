import AbstractView from '../framework/view/abstract-view.js';

const getSortElement = ( { id, name, disabled }, currentSortPoint ) =>
  `<div class="trip-sort__item  trip-sort__item--${ id.slice( 5 ) }">
    <input id="${ id }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${ id }" ${ currentSortPoint === id ? 'checked' : '' } ${ disabled ? 'disabled' : '' } >
    <label class="trip-sort__btn" for="${ id }">${ name }</label>
  </div>`;

export default class TripSortView extends AbstractView {

  constructor( valuesListSort, currentSortPoint ) {
    super();
    this.valuesListSort = valuesListSort;
    this.currentSortPoint = currentSortPoint;
  }

  get template() {
    const sortList = this.valuesListSort.map(( item ) => getSortElement( item, this.currentSortPoint )).join('');

    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              ${ sortList }
            </form>`;
  }

  setClickSortList = ( callback ) => {
    this._callback.closeEditPopup = callback;
    this.element.addEventListener('click', this.#closeEditPopup);
  };

  #closeEditPopup = ( evt ) => {
    if ( evt.target.classList.contains('trip-sort__input') ) {
      this._callback.closeEditPopup( evt.target.id );
    }
  };
}
