import NewInformationTripPrice from '../view/new-information-trip-price.js';
import NewTripFilters from '../view/new-trip-filters.js';
import { render } from '../framework/render.js';

export default class HeaderPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  constructor ( tripPriceContainer, filterContainer, pointsModel ) {
    this.#tripPriceContainer = tripPriceContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #renderTripPrice = () => {
    const tripPrice = new NewInformationTripPrice( this.#boardPoints );

    render( tripPrice, this.#tripPriceContainer, 'afterbegin' );
  };

  #renderBoard = () => {
    this.#renderTripPrice();
    render( new NewTripFilters, this.#filterContainer );
  };
}
