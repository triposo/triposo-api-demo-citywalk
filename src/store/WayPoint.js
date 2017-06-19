import Poi from './Poi'

export default class WayPoint {
  cityWalk

  coordinates
  walkToNextDuration
  walkToNextDistance
  visitTime
  lat
  lng
  poi
  number = 0

  constructor(walk, number, json=null) {
    this.cityWalk = walk
    this.number = number
    if (json) this.fromJSON(json)
  }

  fromJSON(json) {
    this.coordinates = json.coordinates
    this.walkToNextDistance = json.walk_to_next_distance
    this.walkToNextDuration = json.walk_to_next_duration
    this.visitTime = json.visit_time
    this.lat = json.coordinates.latitude
    this.lng = json.coordinates.longitude
    if (json.poi) this.poi = new Poi(json.poi)
  }
}
