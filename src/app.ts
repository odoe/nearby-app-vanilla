import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "./components/nearby-content";

import config from "@arcgis/core/config";
import Locate from "@arcgis/core/widgets/Locate";
import "./styles.css";

import { locate } from "./data/locate";
import { findNearbyPlaces, LatLon } from "./data/places";
import NearbyContent from "./components/nearby-content";
import NearbyMap from "./components/nearby-map";

import createStore from "./store";
import { bearings } from "./utils/bearings";
import Point from "@arcgis/core/geometry/Point";

config.apiKey = import.meta.env.VITE_API_KEY;

const defaultCategories: string[] = ["Coffee Shop"];

interface State {
  page: "list" | "map";
}

const stateObj: State = {
  page: "list",
};

const nav = document.getElementById("nav");
const loader = document.querySelector("calcite-loader");
let mapElem: NearbyMap;

const store = createStore({
  target: stateObj,
  listener: (state) => {
    if (state.page === "map") {
      nav?.classList.remove("hidden");
    } else if (state.page === "list") {
      nav?.classList.add("hidden");
    }
  },
});

async function initialize() {
  await import("./components/nearby-content");
  const locateElem = document.querySelector(".locate-container") as HTMLElement;
  const contentElem = document.querySelector("nearby-content") as NearbyContent;
  const { distance } = await import("@arcgis/core/geometry/geometryEngine");

  new Locate({
    container: locateElem,
  });

  const coords = await locate();
  store.currentLocation = coords;
  const response = await findNearbyPlaces(coords as LatLon, defaultCategories);

  const results = response.map((a) => ({
    name: a.attributes.PlaceName,
    address: a.attributes.Place_addr,
    phone: a.attributes.Phone,
    bearing: bearings(
      store.currentLocation.latitude,
      store.currentLocation.longitude,
      a.location.latitude,
      a.location.longitude
    ),
    distance: distance(new Point(store.currentLocation), a.location),
  }));
  loader?.parentElement?.removeChild(loader);
  contentElem.items = results;

  // event listeners
  contentElem.addEventListener("nearbyCardClickEvent", async (event: any) => {
    if (!mapElem) {
      mapElem = document.createElement("nearby-map") as NearbyMap;
      await import("./components/nearby-map");
    }
    contentElem.replaceWith(mapElem);
    mapElem.items = response;
    mapElem.addLocationToMap(event.detail);
    store.page = "map";
  });

  nav?.addEventListener("click", () => {
    mapElem.replaceWith(contentElem);
    store.page = "list";
  });
}

initialize();
