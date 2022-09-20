import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";

import "./nearby-card";
import NearbyCard from "./nearby-card";

export default class NearbyContent extends HTMLElement {
  private _items: any[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._addStyle();
    this._addTemplate();
  }

  set items(val: any[]) {
    this._items = val;
    this._udpateItemsList();
  }

  // methods
  private _udpateItemsList() {
    const list = this.shadowRoot?.querySelector(
      "calcite-list"
    ) as HTMLCalciteListElement;
    // add cards per item
    const fragment = document.createDocumentFragment();
    for (let item of this._items) {
      const listItem = document.createElement("calcite-list-item");
      const card = document.createElement("nearby-card") as NearbyCard;
      card.item = item;
      card.addEventListener(
        "nearbyCardClickEvent",
        this._onNearbyCardClickHandler.bind(this)
      );
      listItem.appendChild(card);
      fragment.appendChild(listItem);
    }
    list.appendChild(fragment);
  }

  disconnectedCallback() {
    const items = Array.from(
      !this.shadowRoot?.querySelectorAll("nearby-card") as any
    ) as NearbyCard[];
    for (let item of items) {
      item.removeEventListener(
        "nearbyCardClickEvent",
        this._onNearbyCardClickHandler.bind(this)
      );
    }
  }

  private _onNearbyCardClickHandler(event: any) {
    const evt = new CustomEvent("nearbyCardClickEvent", event);
    this.dispatchEvent(evt);
  }

  private _addStyle() {
    const style = document.createElement("style");
    style.textContent = `
    .search-container {
        width: 100%;
    }
    
    header {
        position: sticky;
        top: 0;
        z-index: 999;
    }
    
    footer {
        width: 100%;
    }
    
    nav {
        display: flex;
        width: 100%;
    }
    
    footer {
        position: sticky;
        bottom: 0;
    }
    
    /* nearby-card */
    
    .card-title {
        display: grid; 
        grid-template-columns: 0.2fr 1fr; 
        gap: 0px 0px; 
        justify-content:left; 
        align-items: center; 
    }
    `;
    this.shadowRoot?.appendChild(style);
  }

  private _addTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <calcite-list>
        </calcite-list>
    `;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("nearby-content", NearbyContent);
