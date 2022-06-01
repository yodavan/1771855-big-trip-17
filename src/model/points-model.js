import Observable from '../framework/observable.js';
import { generateDataPoint } from '../mock/route-point-data.js';

const QUANTITY_ELEMENTS = 5;
export default class PointsModel  extends Observable {
  #points = Array.from( { length: QUANTITY_ELEMENTS }, generateDataPoint );

  get points() {
    return this.#points;
  }

  updatePoint = ( updateType, update ) => {
    const index = this.#points.findIndex(( point ) => point.id === update.id);

    if ( index === -1 ) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice( 0, index ),
      update,
      ...this.#points.slice( index + 1 ),
    ];

    this._notify( updateType, update );
  };

  addPoint = ( updateType, update ) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify( updateType, update );
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex(( point ) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
