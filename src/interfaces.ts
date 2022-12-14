export interface ItemProps {
  name: string;
  address: string;
  bearing: string;
  distance: number;
  phone: string;
  location?: LatLon;
  attributes?: any;
}

export interface LatLon {
  latitude: number;
  longitude: number;
}

export interface AppState {
  isMap: boolean;
  location: LatLon;
}
