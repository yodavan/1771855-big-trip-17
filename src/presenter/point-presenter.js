
import { render, replace, remove } from '../framework/render.js';
import NewItemCardTrip from '../view/item-card-trip-view.js';
import NewEditPoint from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor ( pointListContainer ) {
    this.#pointListContainer = pointListContainer;
  }

  init = ( point ) => {
    this.#point = point;

    const prevPointComponent = this.#pointListContainer;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new NewItemCardTrip( point );
    this.#pointEditComponent = new NewEditPoint( point );

    this.#pointComponent.setEditClickHandler( this.#handleEditClick );
    this.#pointEditComponent.setFormSubmitHandler( this.#handleFormSubmit );

    if ( prevPointComponent === null || prevPointEditComponent === null ) {
      render( this.#pointComponent, this.#pointListContainer );
      return;
    }

    if ( this.#pointListContainer.contains( prevPointComponent.element ) ) {
      replace( this.#pointComponent, prevPointComponent );
    }

    if ( this.#pointListContainer.contains( prevPointEditComponent.element ) ) {
      replace( this.#pointEditComponent, prevPointEditComponent );
    }

    remove( prevPointComponent );
    remove( prevPointEditComponent );
  };

  destroy = () => {
    remove( this.#pointComponent );
    remove( this.#pointEditComponent );
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
}
