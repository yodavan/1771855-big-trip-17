
import { render, replace, remove } from '../framework/render.js';
import CardTripView from '../view/card-trip-view.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isTrueArray } from '../utils/utils.js';

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

    this.#pointComponent = new CardTripView( point );
    this.#pointEditComponent = new EditPointView( point );

    this.#pointComponent.setEditClickHandler( this.#handleEditClick );
    this.#pointComponent.setFavoriteClickHandler( this.#handleFavoriteClick );

    this.#pointEditComponent.setFormSubmitHandler( this.#handleFormSubmit );
    this.#pointEditComponent.setClickCloseEditPopup( this.#handleEditClose );
    this.#pointEditComponent.setDeleteClickHandler( this.#handleDeletePoint );

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
    this.#pointEditComponent.reset( this.#point );
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
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handleEditClose = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = ( point ) => {
    const isDataTrue =
      this.#point.dateTo !== point.dateTo || this.#point.dateFrom !== point.dateFrom ||
      this.#point.basePrice !== point.basePrice || this.#point.destination !== point.destination ||
      !isTrueArray( this.#point.offers, point.offers );

    this.#changeData(
      UserAction.UPDATE_POINT,
      isDataTrue ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );
    this.#replaceFormToCard();
  };

  #handleDeletePoint = ( point ) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
