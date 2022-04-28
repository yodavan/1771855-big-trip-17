import NewTripEventsList from '../view/new-trip-events-list.js';
import NewTripSort from '../view/new-trip-sort.js';
import NewItemCardTrip from '../view/new-item-card-trip.js';
import NewEditPoint from '../view/new-edit-point.js';
import { render } from '../render.js';

export default class BoardPresenter {
  tripList = new NewTripEventsList();

  init = ( boardContainer ) => {
    this.boardContainer = boardContainer;

    render( new NewTripSort, this.boardContainer );
    render( this.tripList, this.boardContainer );
    render( new NewEditPoint, this.tripList.getElement(), 'afterbegin' )

    for ( let i = 0; i < 3; i++ ) {
      render( new NewItemCardTrip, this.tripList.getElement() )
    }
  }
}
