import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import SelectionMarker from "./component/SelectionMarker";

class PickContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: { lat: 52.365006, lng: 4.903851 },
      center: null,
      goInside: false,
      time: 180
    };
  }

  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new window.google.maps.places.SearchBox(input);
    this.searchBox.addListener("places_changed", this.onPlacesChanged);
  }

  componentWillUnmount() {
    this.searchBox = null;
  }

  onPlacesChanged = () => {
    let places = this.searchBox.getPlaces();
    let place = places[0];
    this.setState({
      center: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    });
  };

  buildUrl = () => {
    return `/citywalk/${this.state.center.lat}/${this.state.center.lng}/${this
      .state.goInside
      ? "visit"
      : "novisit"}/${this.state.time}`;
  };

  render() {
    return (
      <div className="picker">
        <div className="picker-input">
          <input ref="input" placeholder="Find your Starting point" />
        </div>
        <div className="picker-map">
          <GoogleMap
            defaultZoom={12}
            center={
              this.state.center ? this.state.center : this.state.defaultCenter
            }
          >
            {this.state.center
              ? <SelectionMarker
                  lat={this.state.center.lat}
                  lng={this.state.center.lng}
                />
              : null}
          </GoogleMap>
        </div>
        <div className="extra-options">

          <ul className="form-list">
            <li>
              <label>Go inside</label>
              <input
                type="checkbox"
                label="Go inside attractions"
                checked={this.state.goInside}
                onChange={e =>
                  this.setState({ goInside: !this.state.goInside })}
              />
            </li>
            <li>
              <label>Walk duration in minutes</label>
              <input
                value={this.state.time}
                onChange={e => this.setState({ time: e.target.value })}
                type="number"
              />
            </li>
          </ul>

          {this.state.center
            ? <Link className="action" to={this.buildUrl()}>
                Generate City walk
              </Link>
            : ""}
        </div>
      </div>
    );
  }
}

export default observer(PickContainer);
