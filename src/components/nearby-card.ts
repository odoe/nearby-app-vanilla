export interface ItemProps {
  name: string;
  address: string;
  bearing: string;
  distance: number;
}

export default class NearbyCard extends HTMLElement {
  private _item!: ItemProps;

  set item(val: ItemProps) {
    this._item = val;
    this._udpateElement();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._addStyle();
    this._addTemplate();
  }

  connectedCallback() {
    this.addEventListener("click", this._onClickHandler.bind(this));
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._onClickHandler.bind(this));
  }

  private _udpateElement() {
    const { name, address, bearing, distance } = this._item;
    // elements
    const titleElem = this.shadowRoot?.querySelector(".card-title--name")!;
    const bearingsElem = this.shadowRoot?.querySelector(".bearings")!;
    const distanceElem = this.shadowRoot?.querySelector(".distance")!;
    const addressElem = this.shadowRoot?.querySelector(".address")!;

    titleElem.textContent = name;
    bearingsElem.textContent = bearing;
    distanceElem.textContent = `${distance.toFixed(2)}m`;
    addressElem.textContent = address;
  }

  private _onClickHandler(event: MouseEvent) {
    const { name, address, bearing, distance } = this._item;
    const evt = new CustomEvent("nearbyCardClickEvent", {
      detail: { name, address, bearing, distance, event },
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    this.dispatchEvent(evt);
  }

  private _addTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
		<calcite-card>
			<span slot="title" class="card-title">
				<span class="card-title--name"></span>
				<calcite-icon icon="shopping-cart"></calcite-icon>
			</span>
		<span slot="subtitle">
			<span class="bearings"></span>
			<small class="distance"></small>
			<small class="address"></small>
		</span>
        </calcite-card>
    `;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
  private _addStyle() {
    const style = document.createElement("style");
    style.textContent = `
		:host {
			cursor: pointer;
		}
		`;
    this.shadowRoot?.appendChild(style);
  }
}

customElements.define("nearby-card", NearbyCard);
