import WayPoint from './WayPoint'

export default class CityWalk {
  store

  lat
  lng
  visit
  time
  totalDuration
  seed
  location
  walkDistance
  walkDuration
  waypoints


  constructor(store, location, lat, lng, visit, time, json=null) {
    this.store = store
    this.location = location
    this.lat = lat
    this.lng = lng
    this.visit = visit
    this.time = time
    this.waypoints = []
    if (json) this.fromJSON(json)
  }


  fromJSON(json) {
    this.totalDuration = json.total_duration
    this.seed = json.seed
    this.walkDistance = json.walk_distance
    this.walkDuration = json.walk_duration
    let count = 1;
    json.way_points.forEach(json => {
      if (json.poi) {
        this.waypoints.push(new WayPoint(this, count, json))
        count++
      }
    })
  }
}
