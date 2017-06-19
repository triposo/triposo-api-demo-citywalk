import { extendObservable, action } from "mobx";
import { apiRequest } from "../utils/apirequest.js";
import CityWalk from "./CityWalk";
import Location from "./Location";

export default class Store {
  constructor() {
    extendObservable(this, {
      isLoading: false,
      location: null,
      cityWalk: null,
      activePoi: null
    });
  }

  getMinMaxLatLng() {
    let r = { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };
    this.cityWalk.waypoints.forEach(p => {
      let { latitude, longitude } = p.coordinates;
      if (latitude < r.minLat || r.minLat === 0) {
        r.minLat = latitude;
      }

      if (latitude > r.maxLat || r.maxLat === 0) {
        r.maxLat = latitude;
      }

      if (longitude < r.minLng || r.minLng === 0) {
        r.minLng = longitude;
      }
      if (longitude > r.maxLng || r.maxLng === 0) {
        r.maxLng = longitude;
      }
    });
    return r;
  }

  fetchCityWalk(lat, lng, visit, time, seed) {
    return this.fetchCityByLatLng(lat, lng).then(city => {
      this.citywalk = null;
      let extra = "";
      if (seed) extra = `&seed=${seed}`;
      let url = `city_walk.json?tag_labels=sightseeing&location_id=${city.id}&latitude=${lat}&longitude=${lng}&go_inside=${visit ===
        "novisit"
        ? "false"
        : "true"}&total_time=${time}${extra}`;
      apiRequest(url).then(
        action(result => {
          if (result.results.length) {
            this.cityWalk = new CityWalk(
              this,
              city,
              lat,
              lng,
              visit,
              time,
              result.results[0]
            );
          }
        }),
        fail => {
          console.log("fail");
        }
      );
    });
  }

  fetchCityByLatLng(lat, lng) {
    return apiRequest(
      `location.json?tag_labels=city&annotate=distance:${lat},${lng}&distance=<=20000&count=1&order_by=distance`
    ).then(
      action(json => {
        if (json.results.length) {
          let loc = new Location();
          loc.fromJSON(json.results[0]);
          return Promise.resolve(loc);
        }
        return Promise.reject(`City at location: ${lat},${lng} not found`);
      })
    );
  }
}
