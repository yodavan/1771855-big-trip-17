import BoardPresenter from './presenter/board-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';

const tripMain = document.querySelector( '.trip-main' );
const tripFilters = tripMain.querySelector( '.trip-controls__filters' );
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new BoardPresenter();
const headerPresenter = new HeaderPresenter();
const pointsModel = new PointsModel();

boardPresenter.init( tripEvents, pointsModel );
headerPresenter.init( tripMain, tripFilters );
