import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
    PropertyClassifications: {
        'D': new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                    color: [19, 63, 92, 0.8],
                }),
                stroke: new Stroke({
                    color: [19, 63, 92, 0.8],
                }),
            }),
        }),
        'S': new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                    color: [40, 141, 88, 0.8],
                }),
                stroke: new Stroke({
                    color: [40, 141, 88, 0.8],
                }),
            }),
        }),
        'F': new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                    color: [188, 80, 144, 0.8],
                }),
                stroke: new Stroke({
                    color: [188, 80, 144, 0.8],
                }),
            }),
        }),
        'T': new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                    color: [235, 95, 94, 0.8],
                }),
                stroke: new Stroke({
                    color: [235, 95, 94, 0.8],
                }),
            }),
        }),
        'O': new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                    color: [243, 165, 51, 0.8],
                }),
                stroke: new Stroke({
                    color: [243, 165, 51, 0.8],
                }),
            }),
        }),
    },
};