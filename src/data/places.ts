import Point from "@arcgis/core/geometry/Point";
import { addressToLocations } from "@arcgis/core/rest/locator";

import { categoryForFoodType } from "../utils/iconTypes";

export interface LatLon {
  latitude: number;
  longitude: number;
}

export const geocodeURL =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

/**
 * Users Portal URL.
 */
export const portalUrl = "https://www.arcgis.com"; // default Portal URL

export const maxLocations = 50;

/**
 * Use the Locator to search for nearby places
 * with a given lat lon and categories
 */
export const findNearbyPlaces = async (
  latLon: LatLon,
  categories: string[]
) => {
  const { latitude, longitude } = latLon;
  if (Math.abs(latitude) < 1 && Math.abs(longitude) < 1) return [];
  const point = new Point({ longitude, latitude });

  const results = await addressToLocations(geocodeURL, {
    address: undefined,
    location: point,
    categories,
    maxLocations,
    outFields: ["Place_addr", "PlaceName", "Phone", "URL", "Type"],
  });

  return (
    results
      // do a client side filter of results
      // for example, Pizza is a sub-category of Food,
      // but user may want to filter Pizza results out
      .filter((result) => {
        const type = result.attributes.Type;
        const category = categoryForFoodType(type);
        return categories.indexOf(category) > -1;
      })
  );
};
