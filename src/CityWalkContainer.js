import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "./component/Loading";
import CityWalk from "./component/CityWalk";
import CityWalkMap from "./component/CityWalkMap";
import Poi from "./component/Poi";
import Portal from "./component/Portal";

class CityWalkContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.store.cityWalk = null;
  }

  componentDidMount() {
    const { lat, lng, visit, time, seed } = this.props.params;
    this.props.store.fetchCityWalk(lat, lng, visit, time, seed);
  }

  renderPortal = () => {
    return <Poi poiId={this.props.store.activePoi.id} />;
  };

  onClosePortal = () => {
    this.props.store.activePoi = null;
  };

  render() {
    const { store } = this.props;
    if (!store.cityWalk) return <Loading />;

    return (
      <div>
        <Link to="/" className="home-button">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Link>

        <CityWalkMap
          store={store}
          lat={parseFloat(this.props.params.lat)}
          lng={parseFloat(this.props.params.lng)}
        />
        <CityWalk cityWalk={store.cityWalk} />
        {store.activePoi
          ? <Portal render={this.renderPortal} onClose={this.onClosePortal} />
          : ""}
      </div>
    );
  }
}

export default observer(CityWalkContainer);
