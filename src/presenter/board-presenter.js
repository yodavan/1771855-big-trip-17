import NewTripEventsList from '../view/new-trip-events-list.js';
import NewTripSort from '../view/new-trip-sort.js';
import NewItemCardTrip from '../view/new-item-card-trip.js';
import NewEditPoint from '../view/new-edit-point.js';
import NoTripPoints from '../view/no-trip-points.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new NewTripEventsList();

  constructor ( boardContainer, pointsModel ) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
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

  #renderBoard = () => {
    if ( this.#boardPoints.length === 0 ) {
      return render( new NoTripPoints, this.#boardContainer );
    }

    render( new NewTripSort, this.#boardContainer );
    render( this.#tripList, this.#boardContainer );

    this.#boardPoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };
}
