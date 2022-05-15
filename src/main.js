import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const tripMain = document.querySelector( '.trip-main' );
const tripFilters = tripMain.querySelector( '.trip-controls__filters' );
const tripEvents = document.querySelector( '.trip-events' );

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(
  tripEvents,
  tripMain,
  tripFilters,
  pointsModel
);

boardPresenter.init();
