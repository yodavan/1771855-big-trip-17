import NewInformationTripPrice from '../view/new-information-trip-price.js';
import NewTripFilters from '../view/new-trip-filters.js';
import { render } from '../framework/render.js';

export default class HeaderPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;

  init = ( tripPriceContainer, filterContainer ) => {
    this.#tripPriceContainer = tripPriceContainer;
    this.#filterContainer = filterContainer;

    render( new NewInformationTripPrice, this.#tripPriceContainer, 'afterbegin' );
    render( new NewTripFilters, this.#filterContainer );
  };
}
