import NewTripEventsList from '../view/new-trip-events-list.js';
import NewTripSort from '../view/new-trip-sort.js';
import NewItemCardTrip from '../view/new-item-card-trip.js';
import NewEditPoint from '../view/new-edit-point.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new NewTripEventsList();

  init = ( boardContainer, pointsModel ) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render( new NewTripSort, this.#boardContainer );
    render( this.#tripList, this.#boardContainer );

    this.#boardPoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderPoint = ( point ) => {
    const pointComponent = new NewItemCardTrip( point );
    const pointEditComponent = new NewEditPoint( point );

    const replaceCardToForm = () => {
      this.#tripList.element.replaceChild( pointEditComponent.element, pointComponent.element );
    };

    const replaceFormToCard = () => {
      this.#tripList.element.replaceChild( pointComponent.element, pointEditComponent.element );
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

    pointComponent.element.querySelector( '.event__rollup-btn' ).addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener( 'keydown', onEscKeyDown );
      pointEditComponent.element.querySelector( '.event__rollup-btn' ).addEventListener( 'click', onCloseButton );
    });

    pointEditComponent.element.querySelector( 'form' ).addEventListener('submit', ( evt ) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener( 'keydown', onEscKeyDown );
    });

    render( pointComponent, this.#tripList.element );
  }
}
