import { UpdateType } from '../const.js';
import TripFiltersView  from '../view/trip-filters-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [
      {
        type: 'everything',
        name: 'Everything'
      },
      {
        type: 'future',
        name: 'Future'
      },
      {
        type: 'past',
        name: 'Past'
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFiltersView( filters, this.#filterModel.filter );
    this.#filterComponent.setFilterTypeChangeHandler( this.#handleFilterTypeChange );

    if ( prevFilterComponent === null ) {
      render( this.#filterComponent, this.#filterContainer );
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = ( filterType ) => {
    if ( this.#filterModel.filter === filterType ) {
      return;
    }

    this.#filterModel.setFilter( UpdateType.MAJOR, filterType );
  };
}
