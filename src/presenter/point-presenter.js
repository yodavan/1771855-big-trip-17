
import { render, replace, remove } from '../framework/render.js';
import NewItemCardTrip from '../view/item-card-trip-view.js';
import NewEditPoint from '../view/edit-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor ( pointListContainer, changeData, changeMode ) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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

    if ( this.#mode === Mode.DEFAULT ) {
      replace( this.#pointComponent, prevPointComponent );
    }

    if ( this.#mode === Mode.EDITING ) {
      replace( this.#pointEditComponent, prevPointEditComponent );
    }

    remove( prevPointComponent );
    remove( prevPointEditComponent );
  };

  destroy = () => {
    remove( this.#pointComponent );
    remove( this.#pointEditComponent );
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace( this.#pointEditComponent, this.#pointComponent );
    document.addEventListener( 'keydown', this.#EscKeyDownHandler );
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace( this.#pointComponent, this.#pointEditComponent );
    document.removeEventListener( 'keydown', this.#EscKeyDownHandler );
    this.#mode = Mode.DEFAULT;
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
  };

  #handleFormSubmit = ( point ) => {
    this.#changeData( point );
    this.#replaceFormToCard();
  };
}
