import NewTripEventsList from '../view/new-trip-events-list.js';
import NewTripSort from '../view/new-trip-sort.js';
import NewItemCardTrip from '../view/new-item-card-trip.js';
import NewEditPoint from '../view/new-edit-point.js';
import { render } from '../render.js';

export default class BoardPresenter {
  tripList = new NewTripEventsList();

  init = ( boardContainer, pointsModel ) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()]

    console.log(this.boardPoints);

    render( new NewTripSort, this.boardContainer );
    render( this.tripList, this.boardContainer );
    render( new NewEditPoint, this.tripList.getElement(), 'afterbegin' );

    this.boardPoints.forEach(( item ) => {
      render( new NewItemCardTrip( item ), this.tripList.getElement() );
    });
  };
}
