import Observable from '../framework/observable.js';
import { generateDataPoint } from '../mock/route-point-data.js';

const QUANTITY_ELEMENTS = 15;
export default class PointsModel  extends Observable {
  #points = Array.from( { length: QUANTITY_ELEMENTS }, generateDataPoint );

  get points() {
    return this.#points;
  }
}
