import { generateDataPoint } from '../mock/route-point-data.js';

export default class PointsModel {
  points = Array.from( {length: 5}, generateDataPoint );

  getPoints = () => this.points;
}
