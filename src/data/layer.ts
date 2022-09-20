import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Field from "@arcgis/core/layers/support/Field";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";

const cimJSON = {
  type: "CIMPointSymbol",
  symbolLayers: [
    {
      type: "CIMVectorMarker",
      enable: true,
      anchorPointUnits: "Relative",
      dominantSizeAxis3D: "Z",
      size: 24,
      billboardMode3D: "FaceNearPlane",
      frame: { xmin: 0, ymin: 0, xmax: 490, ymax: 490 },
      markerGraphics: [
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [403, 174],
                [385, 177],
                [369, 184],
                [385, 250],
                [392, 320],
                [403, 321],
                [429, 316],
                [451, 300],
                [465, 276],
                [470, 248],
                [465, 220],
                [451, 196],
                [429, 180],
                [403, 174],
              ],
              [
                [319, 78],
                [319, 78],
                [319, 78],
                [343, 118],
                [363, 165],
                [383, 157],
                [403, 154],
                [420, 156],
                [436, 161],
                [451, 170],
                [464, 181],
                [475, 195],
                [483, 211],
                [488, 229],
                [490, 247],
                [488, 265],
                [483, 283],
                [475, 299],
                [464, 313],
                [451, 325],
                [436, 333],
                [420, 339],
                [403, 340],
                [393, 340],
                [393, 356],
                [26, 356],
                [31, 276],
                [45, 201],
                [69, 133],
                [84, 104],
                [100, 78],
                [319, 78],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              { type: "CIMSolidFill", enable: true, color: [0, 0, 0, 255] },
            ],
          },
        },
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [465, 6],
                [487, 59],
                [0, 59],
                [23, 6],
                [465, 6],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              { type: "CIMSolidFill", enable: true, color: [0, 0, 0, 255] },
            ],
          },
        },
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [116.7, 387.1],
                [120.4, 387.8],
                [123.6, 389.9],
                [125.7, 393.1],
                [126.4, 396.8],
                [126.4, 437.3],
                [125.7, 441.0],
                [123.6, 444.2],
                [120.4, 446.3],
                [116.7, 447.0],
                [113.0, 446.3],
                [109.8, 444.2],
                [107.7, 441.0],
                [107.0, 437.3],
                [107.0, 396.9],
                [107.1, 395.1],
                [107.5, 393.3],
                [109.7, 390.1],
                [112.9, 387.9],
                [116.7, 387.1],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              { type: "CIMSolidFill", enable: true, color: [0, 0, 0, 255] },
            ],
          },
        },
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [209.6, 387.1],
                [213.3, 387.8],
                [216.5, 389.9],
                [218.6, 393.1],
                [219.3, 396.8],
                [219.3, 474.6],
                [218.6, 478.3],
                [216.5, 481.5],
                [213.3, 483.6],
                [209.6, 484.3],
                [205.9, 483.6],
                [202.7, 481.5],
                [200.6, 478.3],
                [199.9, 474.6],
                [199.9, 396.8],
                [200.7, 393.2],
                [202.8, 390.0],
                [206.0, 387.8],
                [209.6, 387.1],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              { type: "CIMSolidFill", enable: true, color: [0, 0, 0, 255] },
            ],
          },
        },
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [302.6, 387.1],
                [306.3, 387.8],
                [309.5, 389.9],
                [311.6, 393.1],
                [312.3, 396.8],
                [312.3, 437.3],
                [311.6, 441.0],
                [309.5, 444.2],
                [306.3, 446.3],
                [302.6, 447.0],
                [298.9, 446.3],
                [295.7, 444.2],
                [293.6, 441.0],
                [292.9, 437.3],
                [292.9, 396.9],
                [293.6, 393.2],
                [295.7, 390.0],
                [298.9, 387.8],
                [302.6, 387.1],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              { type: "CIMSolidFill", enable: true, color: [0, 0, 0, 255] },
            ],
          },
        },
      ],
      scaleSymbolsProportionally: true,
      respectFrame: true,
      clippingPath: {
        type: "CIMClippingPath",
        clippingType: "Intersect",
        path: {
          rings: [
            [
              [0, 0],
              [490, 0],
              [490, 490],
              [0, 490],
              [0, 0],
            ],
          ],
        },
      },
    },
  ],
  haloSize: 1,
  scaleX: 1,
  angleAlignment: "Display",
};

// Fields
const fields = [
  {
    name: "OBJECTID",
    alias: "OBJECTID",
    type: "oid",
  },
  {
    name: "Place_addr",
    alias: "Address",
    type: "string",
  },
  // {
  //   name: "bearing",
  //   alias: "Bearing",
  //   type: "string",
  // },
  // {
  //   name: "distance",
  //   alias: "Distance",
  //   type: "double",
  // },
  {
    name: "PlaceName",
    alias: "Name",
    type: "string",
  },
  {
    name: "Phone",
    alias: "Phone",
    type: "string",
  },
  {
    name: "URL",
    alias: "Url",
    type: "string",
  },
  {
    name: "Type",
    alias: "Type",
    type: "string",
  },
].map((field) => new Field(field as any));

const popupTemplate = new PopupTemplate({
  title: "{PlaceName}",
  content: ({ graphic }: { graphic: Graphic }) => {
    const { Phone, Place_addr } = graphic.attributes;
    const container = document.createElement("div");
    const list = document.createElement("calcite-value-list");
    list.innerHTML = `
			<calcite-value-list-item label="${Place_addr}" description="
			Phone: ${Phone || "none"}
			">
		`;
    container.appendChild(list);
    return container;
  },
});

const renderer = new SimpleRenderer({
  symbol: new CIMSymbol({
    data: {
      type: "CIMSymbolReference",
      symbol: cimJSON,
    } as any,
  }),
});

export const nearbyLayer = new FeatureLayer({
  id: "nearby-places",
  title: "Nearby Places",
  geometryType: "point",
  source: [],
  fields,
  objectIdField: "OBJECTID",
  outFields: ["*"],
  renderer,
  popupTemplate,
  spatialReference: SpatialReference.WGS84,
});
