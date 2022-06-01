import TripEventsListView from '../view/trip-events-list-view.js';
import InformationTripPriceView from '../view/information-trip-price-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import NoTripPointsView from '../view/no-trip-points-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { valuesListSort } from '../mock/data-sort.js';

export default class BoardPresenter {
  #tripPriceContainer = null;
  #filterContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #tripList = new TripEventsListView();
  #pointPresenter = new Map();
  #currentSortPoint = 'sort-day';
  #tripPrice = new InformationTripPriceView();
  #sortComponent = new TripSortView();
  #mainFilters = new TripFiltersView();

  constructor ( boardContainer, tripPriceContainer, filterContainer, pointsModel ) {
    this.#boardContainer = boardContainer;
    this.#tripPriceContainer = tripPriceContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver( this.#handleModelEvent );
  }

  get points () {
    return [ ...this.#pointsModel.points ].sort( SortType[ this.#currentSortPoint ] );
  }

  init = () => {
    this.#renderBoard({ renderNotAllData: true, renderAllData: true });
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach(( presenter ) => presenter.resetView());
  };

  #handleSortTypeChange = ( sort ) => {
    this.#currentSortPoint = sort;
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSortFilters = () => {
    this.#sortComponent = new TripSortView( valuesListSort );
    render( this.#sortComponent, this.#boardContainer );
    this.#sortComponent.setClickSortList( this.#handleSortTypeChange);
  };

  #handleViewAction = ( actionType, updateType, update ) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch ( actionType ) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint( updateType, update );
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint( updateType, update );
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint( updateType, update );
        break;
    }
  };

  #handleModelEvent = ( updateType, data ) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearPointList({ removeNotAllData: true });
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearPointList({ removeNotAllData: true, removeAllData: true });
        this.#renderBoard({ renderNotAllData: true });
        break;
    }
  };

  #renderPoint = ( point ) => {
    const pointPresenter = new PointPresenter( this.#tripList.element, this.#handleViewAction, this.#handleModeChange  );
    pointPresenter.init( point );
    this.#pointPresenter.set( point.id, pointPresenter );
  };

  #clearPointList = ({ removeNotAllData = false, removeAllData = false } = {}) => {
    this.#pointPresenter.forEach(( presenter ) => presenter.destroy());
    this.#pointPresenter.clear();

    if ( removeNotAllData ) {
      remove( this.#tripPrice );
    }

    if ( removeAllData ) {
      remove( this.#sortComponent );

      this.#currentSortPoint = 'sort-day';
    }
  };

  #renderPoints = () => {
    this.points.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderTripPrice = () => {
    this.#tripPrice = new InformationTripPriceView( this.points );

    render( this.#tripPrice, this.#tripPriceContainer, RenderPosition.AFTERBEGIN );
  };

  #renderMainFilters = () => {
    render( this.#mainFilters, this.#filterContainer );
  };

  #renderBoard = ({ renderNotAllData = false, renderAllData = false } = {}) => {
    this.#renderPoints();
    this.#renderTripPrice();

    if ( !this.points.length ) {
      this.#renderMainFilters();
      render( new NoTripPointsView, this.#boardContainer );
      return;
    }

    if ( renderNotAllData ) {
      this.#renderSortFilters();
    }

    if ( renderAllData ) {
      this.#renderMainFilters();
      render( this.#tripList, this.#boardContainer );
    }
  };
}
