
import { render, replace } from '../framework/render.js';
import NewItemCardTrip from '../view/item-card-trip-view.js';
import NewEditPoint from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor ( pointListContainer ) {
    this.#pointListContainer = pointListContainer;
  };

  init = ( point ) => {
    this.#point = point;

    this.#pointComponent = new NewItemCardTrip( point );
    this.#pointEditComponent = new NewEditPoint( point );

    this.#pointComponent.setEditClickHandler( this.#handleEditClick );
    this.#pointEditComponent.setFormSubmitHandler( this.#handleFormSubmit );

    render( this.#pointComponent, this.#pointListContainer )
  };

  #replaceCardToForm = () => {
    replace( this.#pointEditComponent, this.#pointComponent );
    document.addEventListener( 'keydown', this.#EscKeyDownHandler );
  };

  #replaceFormToCard = () => {
    replace( this.#pointComponent, this.#pointEditComponent );
    document.removeEventListener( 'keydown', this.#EscKeyDownHandler );
  };

  #EscKeyDownHandler = ( evt ) => {
    if ( evt.key === 'Escape' || evt.key === 'Esc' ) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  // const onCloseButton = () => {
  //   replaceFormToCard();
  //   document.removeEventListener( 'keydown', onEscKeyDown );
  // };

  // pointComponent.setEditClickHandler(() => {
  //   replaceCardToForm();
  //   document.addEventListener( 'keydown', onEscKeyDown );
  //   pointEditComponent.element.querySelector( '.event__rollup-btn' ).addEventListener( 'click', onCloseButton );
  // });

  // pointEditComponent.setFormSubmitHandler(() => {
  //   replaceFormToCard();
  //   document.removeEventListener( 'keydown', onEscKeyDown );
  // });

  // render( pointComponent, this.#tripList.element );
}
