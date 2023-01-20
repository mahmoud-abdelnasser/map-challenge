import { PolygonLayer, MapConfig } from "../../utils/types";


export const mapConfig: MapConfig = {
  avatar: "",
  maxZoom: 14,
  minZoom: 0,
  type: "vector",
  style:"mapbox://styles/mapbox/streets-v9",
  accessToken:
    "pk.eyJ1IjoiamFzcGVyOHZlcmNub2NrZSIsImEiOiJjazFnNHd5bHEwanhxM2xxbGpyM2lubGVvIn0.0bupq1xoTuqYx8B1vG_azw",
  title: "GRB"
};

export const DATA_URL: string| PolygonLayer =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line



