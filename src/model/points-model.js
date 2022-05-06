import { generateDataPoint } from '../mock/route-point-data.js';

const QUANTITY_ELEMENTS = 10;
export default class PointsModel {
  #points = Array.from( { length: QUANTITY_ELEMENTS }, generateDataPoint );

  get points() {
    return this.#points;
  }
}
