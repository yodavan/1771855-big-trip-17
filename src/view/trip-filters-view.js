import AbstractView from '../framework/view/abstract-view.js';

const ctreateFilterItem = ( { type, name } , currentFilterType ) =>
  `<div class="trip-filters__filter">
    <input
      id="filter-${ type }"
      class="trip-filters__filter-input
      visually-hidden" type="radio"
      name="trip-filter"
      value="${ type }"
      ${ type === currentFilterType ? 'checked' : '' }
    >
    <label class="trip-filters__filter-label" for="filter-${ type }">${ name }</label>
  </div>`;

const  createFilters = ( filters, currentFilterType ) =>
  filters.map(( item ) => ctreateFilterItem( item, currentFilterType )).join('');

export default class TripFiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor( filters, currentFilterType ) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return `<form class="trip-filters" action="#" method="get">
              ${ createFilters( this.#filters, this.#currentFilter ) }
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
  }

  setFilterTypeChangeHandler = ( callback ) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener( 'change', this.#filterTypeChangeHandler );
  };

  #filterTypeChangeHandler = ( evt ) => {
    evt.preventDefault();
    this._callback.filterTypeChange( evt.target.value );
  };
}
