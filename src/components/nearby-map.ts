import Point from "@arcgis/core/geometry/Point";
import ArcGISMap from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";

import { nearbyLayer } from "../data/layer";
import { ItemProps } from "../interfaces";

const ZOOM = 16;
const BASEMAP = "streets-navigation-vector";

let highlight: __esri.Handle;

export default class NearbyMap extends HTMLElement {
  private _items: ItemProps[] = [];

  view!: MapView;
  nearbyLayerView!: __esri.FeatureLayerView;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._addStyle();
    this._addTemplate();
  }

  set items(val: any[]) {
    this._items = val;
  }

  // methods
  connectedCallback() {
    this._initMap();
  }
  disconnectedCallback() {}

  private _addStyle() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute(
      "href",
      "https://js.arcgis.com/next/esri/themes/light/main.css"
    );
    const style = document.createElement("style");
    style.textContent = `
        .map-container {
            width: 100%;
            height: 100%;
        }
    `;
    this.shadowRoot?.appendChild(linkElem);
    this.shadowRoot?.appendChild(style);
  }

  private _addTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="map-container"></div>
    `;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  async addLocationToMap(item: ItemProps) {
    if (!this.nearbyLayerView) {
      this.nearbyLayerView = await this.view.whenLayerView(nearbyLayer);
    }

    const query = nearbyLayer.createQuery();
    query.where = `Place_addr = '${item.address}'`;
    const oids = await nearbyLayer.queryObjectIds(query);
    const { features } = await nearbyLayer.queryFeatures(query);
    if (!features.length) return;
    highlight && highlight.remove();
    highlight = this.nearbyLayerView.highlight(oids);
    this.view.goTo({ target: features, zoom: ZOOM });
  }

  private async _initMap() {
    const container =
      this.shadowRoot?.querySelector<HTMLDivElement>(".map-container")!;
    if (this.view) {
      this.view.container = container;
      return;
    }
    const map = new ArcGISMap({
      basemap: BASEMAP,
      layers: [nearbyLayer],
    });

    const view = new MapView({
      map,
      container,
      center: [-118, 34],
      zoom: 4,
    });

    const search = new Search({ view });

    this.view = view;

    await view.when();

    view.ui.add(search, "top-right");

    if (this._items?.length) {
      const graphics = this._items.map(
        (x) =>
          new Graphic({
            geometry: new Point(x.location),
            attributes: x.attributes,
          })
      );

      const controller = new AbortController();

      await view.goTo({ target: graphics }, { signal: controller.signal });

      await nearbyLayer.applyEdits({
        addFeatures: graphics,
      });
    }
  }
}

customElements.define("nearby-map", NearbyMap);
