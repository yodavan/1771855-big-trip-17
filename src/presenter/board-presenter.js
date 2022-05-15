import NewTripEventsList from '../view/new-trip-events-list.js';
import NewInformationTripPrice from '../view/new-information-trip-price.js';
import NewTripFilters from '../view/new-trip-filters.js';
import NewTripSort from '../view/new-trip-sort.js';
import NewItemCardTrip from '../view/new-item-card-trip.js';
import NewEditPoint from '../view/new-edit-point.js';
import NoTripPoints from '../view/no-trip-points.js';
import { render, replace, RenderPosition } from '../framework/render.js';

export default class BoardPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new NewTripEventsList();

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
    const pointComponent = new NewItemCardTrip( point );
    const pointEditComponent = new NewEditPoint( point );

    const replaceCardToForm = () => {
      replace( pointEditComponent, pointComponent );
    };

    const replaceFormToCard = () => {
      replace( pointComponent, pointEditComponent );
    };

    const onEscKeyDown = ( evt ) => {
      if ( evt.key === 'Escape' || evt.key === 'Esc' ) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener( 'keydown', onEscKeyDown );
      }
    };

    const onCloseButton = () => {
      replaceFormToCard();
      document.removeEventListener( 'keydown', onEscKeyDown );
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener( 'keydown', onEscKeyDown );
      pointEditComponent.element.querySelector( '.event__rollup-btn' ).addEventListener( 'click', onCloseButton );
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener( 'keydown', onEscKeyDown );
    });

    render( pointComponent, this.#tripList.element );
  };

  #renderNoPoints = () => {
    render( new NoTripPoints, this.#boardContainer );
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
