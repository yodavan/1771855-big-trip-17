import NewTripEventsList from '../view/trip-events-list-view.js';
import NewInformationTripPrice from '../view/information-trip-price-view.js';
import NewTripFilters from '../view/new-trip-filters-view.js';
import NewTripSort from '../view/new-trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import NoTripPoints from '../view/no-trip-points-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class BoardPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new NewTripEventsList();
  #pointPresenter = new Map();

  constructor ( boardContainer, tripPriceContainer, filterContainer, pointsModel ) {
    this.#boardContainer = boardContainer;
    this.#tripPriceContainer = tripPriceContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #renderSortFilters = () => {
    render( new NewTripSort, this.#boardContainer );
  };

  #renderPoint = ( point ) => {
    const pointPresenter = new PointPresenter( this.#tripList.element );
    pointPresenter.init( point );
    this.#pointPresenter.set( point.id, pointPresenter );
  };

  #renderNoPoints = () => {
    render( new NoTripPoints, this.#boardContainer );
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach(( presenter ) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPoints = () => {
    if ( !this.#boardPoints.length ) {
      return this.#renderNoPoints();
    }

    this.#renderSortFilters();
    this.#renderTripPrice();

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
    this.#renderPoints();
    this.#renderMainFilters();

    render( this.#tripList, this.#boardContainer );
  };
}
