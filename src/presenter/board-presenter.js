import TripEventsListView from '../view/trip-events-list-view.js';
import InformationTripPriceView from '../view/information-trip-price-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import NoTripPointsView from '../view/no-trip-points-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { valuesListSort } from '../utils/data-sort.js';
import { filter } from '../utils/data-filter.js';

export default class BoardPresenter {
  #tripPriceContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #tripList = new TripEventsListView();
  #pointPresenter = new Map();
  #currentSortPoint = 'sort-day';
  #tripPrice = new InformationTripPriceView();
  #sortComponent = new TripSortView();
  #filterModel = null;
  #noPoints = new NoTripPointsView();

  constructor ( boardContainer, tripPriceContainer, pointsModel, filterModel ) {
    this.#boardContainer = boardContainer;
    this.#tripPriceContainer = tripPriceContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver( this.#handleModelEvent );
    this.#filterModel.addObserver( this.#handleModelEvent );
  }

  get points () {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[ filterType ]( points );

    return filteredPoints.sort( SortType[ this.#currentSortPoint ] );
  }

  init = () => {
    this.#renderBoard();
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
    this.#sortComponent = new TripSortView( valuesListSort, this.#currentSortPoint );
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
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList({ removeNotAllData: true });
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({ removeNotAllData: true, removeAllData: true });
        this.#renderBoard();
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
      remove( this.#noPoints );
      remove( this.#tripPrice );
      remove( this.#sortComponent );
    }

    if ( removeAllData ) {
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

  #renderBoard = () => {
    this.#renderPoints();
    this.#renderTripPrice();

    if ( !this.points.length ) {
      render( this.#noPoints, this.#boardContainer );
      return;
    }

    this.#renderSortFilters();
    render( this.#tripList, this.#boardContainer );
  };
}
