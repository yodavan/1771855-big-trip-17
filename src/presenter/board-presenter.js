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
    this.boardPoints = [...this.pointsModel.getPoints()];

    render( new NewTripSort, this.boardContainer );
    render( this.tripList, this.boardContainer );
    render( new NewEditPoint( this.boardPoints[0] ), this.tripList.getElement(), 'afterbegin' );

    this.boardPoints.forEach(( point, index ) => {
      if ( index !== 0 ) {
        render( new NewItemCardTrip( point ), this.tripList.getElement() );
      }
    });
  };
}
