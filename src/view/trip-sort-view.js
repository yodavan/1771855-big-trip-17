import AbstractView from '../framework/view/abstract-view.js';

const getSortElement = ( { id, name, checked, disabled } ) =>
  `<div class="trip-sort__item  trip-sort__item--${ id }">
    <input id="sort-${ id }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ id }" ${ checked ? 'checked' : '' } ${ disabled ? 'disabled' : '' } >
    <label class="trip-sort__btn" for="sort-${ id }">${ name }</label>
  </div>`;

export default class TripSortView extends AbstractView {

  constructor( valuesListSort ) {
    super();
    this.valuesListSort = valuesListSort;
  }

  get template() {
    const sortList = this.valuesListSort.map(( item ) => getSortElement( item )).join('');

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
