import { sortDurationDown, sortDateUp, sortPriceDown } from './utils/utils.js';

const SortType = {
  'sort-time': sortDurationDown,
  'sort-day': sortDateUp,
  'sort-price': sortPriceDown,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { SortType, UserAction, UpdateType };
