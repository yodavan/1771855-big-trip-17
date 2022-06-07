import AbstractView from '../framework/view/abstract-view.js';

const NoPointsTextValue = {
  'everything': 'Click New Event to create your first point',
  'past': 'There are no past events now',
  'future': 'There are no future events now',
};

export default class NoTripPointsView extends AbstractView {
  #filterType = null;

  constructor( filterType ) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return `<p class="trip-events__msg">
              ${ NoPointsTextValue[ this.#filterType ] }
            </p>`;
  }
}
