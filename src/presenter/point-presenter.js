
import { render, replace, remove } from '../framework/render.js';
import NewItemCardTrip from '../view/item-card-trip-view.js';
import NewEditPoint from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor ( pointListContainer, changeData ) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = ( point ) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new NewItemCardTrip( point );
    this.#pointEditComponent = new NewEditPoint( point );

    this.#pointComponent.setEditClickHandler( this.#handleEditClick );
    this.#pointComponent.setFavoriteClickHandler( this.#handleFavoriteClick );

    this.#pointEditComponent.setFormSubmitHandler( this.#handleFormSubmit );
    this.#pointEditComponent.setClickCloseEditPopup( this.#handleEditClose );

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

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleEditClose = () => {
    this.#replaceFormToCard();
  }

  #handleFormSubmit = ( point ) => {
    this.#changeData( point );
    this.#replaceFormToCard();
  };
}
