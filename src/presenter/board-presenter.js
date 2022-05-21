import NewTripEventsList from '../view/trip-events-list-view.js';
import NewInformationTripPrice from '../view/information-trip-price-view.js';
import NewTripFilters from '../view/new-trip-filters-view.js';
import NewTripSort from '../view/new-trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import NoTripPoints from '../view/no-trip-points-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem, sortDurationDown, sortDateUp, sortPriceDown } from '../utils.js';

export default class BoardPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new NewTripEventsList();
  #sortComponent = new NewTripSort();
  #pointPresenter = new Map();

  constructor ( boardContainer, tripPriceContainer, filterContainer, pointsModel ) {
    this.#boardContainer = boardContainer;
    this.#tripPriceContainer = tripPriceContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [ ...this.#pointsModel.points ].sort( sortDateUp );
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach(( presenter ) => presenter.resetView());
  };

  #sortPoints = ( sortType  ) => {
    if ( sortType === 'sort-time' ) {
      return this.#boardPoints.sort( sortDurationDown );
    }

    if ( sortType === 'sort-day' ) {
      return this.#boardPoints.sort( sortDateUp );
    }

    if ( sortType === 'sort-price' ) {
      return this.#boardPoints.sort( sortPriceDown );
    }
  };

  #handleSortTypeChange = ( sortType ) => {
    this.#sortPoints( sortType );
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSortFilters = () => {
    render( this.#sortComponent, this.#boardContainer );
    this.#sortComponent.setClickSortList( this.#handleSortTypeChange);
  };

  #handlePointChange = ( updatedPoint ) => {
    this.#boardPoints = updateItem( this.#boardPoints, updatedPoint );
    this.#pointPresenter.get( updatedPoint.id ).init( updatedPoint );
  };

  #renderPoint = ( point ) => {
    const pointPresenter = new PointPresenter( this.#tripList.element, this.#handlePointChange, this.#handleModeChange  );
    pointPresenter.init( point );
    this.#pointPresenter.set( point.id, pointPresenter );
  };

  #renderNoPoints = () => {
    if ( !this.#boardPoints.length ) {
      return render( new NoTripPoints, this.#boardContainer );
    }

    this.#renderSortFilters();
    this.#renderTripPrice();
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach(( presenter ) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPoints = () => {
    this.#boardPoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderTripPrice = () => {
    const tripPrice = new NewInformationTripPrice( this.#boardPoints );

    render( tripPrice, this.#tripPriceContainer, RenderPosition.AFTERBEGIN );
  };

  #renderMainFilters = () => {
    render( new NewTripFilters, this.#filterContainer );
  };

  #renderBoard = () => {
    this.#renderNoPoints();
    this.#renderPoints();
    this.#renderMainFilters();

    render( this.#tripList, this.#boardContainer );
  };
}
