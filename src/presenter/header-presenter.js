import NewInformationTripPrice from '../view/new-information-trip-price.js';
import NewTripFilters from '../view/new-trip-filters.js';
import { render } from '../render.js';

export default class HeaderPresenter {

  init = ( tripPriceContainer, filterContainer ) => {
    this.tripPriceContainer = tripPriceContainer;
    this.filterContainer = filterContainer;

    render( new NewInformationTripPrice, this.tripPriceContainer, 'afterbegin' );
    render( new NewTripFilters, this.filterContainer );
  }
}
