import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const tripMain = document.querySelector( '.trip-main' );
const tripFilters = tripMain.querySelector( '.trip-controls__filters' );
const tripEvents = document.querySelector( '.trip-events' );

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter( tripEvents, tripMain, pointsModel, filterModel );
const filterPresenter = new FilterPresenter( tripFilters, filterModel, pointsModel );

filterPresenter.init();
boardPresenter.init();
