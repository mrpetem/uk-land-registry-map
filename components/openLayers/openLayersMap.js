import { Component } from "react";

import Map from "./map";
import { Layers, TileLayer, VectorLayer } from "./layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./controls";
import mapConfig from "./config.json";

const geojsonObject = mapConfig.geojsonObject;


class OpenLayersMap extends Component {


	constructor(props){
		super(props);

		this.state = {
			mapCenter: props.center
		}
	}



	// Take the array of passed geoJSON objects intended as vector layers and build each layer
	loadVectorLayers(){

		if(!this.props.vectorObjects || !this.props.vectorObjects.length){
			return;
		}

		const vectorLayers = this.props.vectorObjects.map((vectorObject,i) => {

			return (<VectorLayer key={Date.now() + i}
		              source={vector({
		                features: new GeoJSON().readFeatures(vectorObject.geoJsonObject, {
		                  featureProjection: get("EPSG:3857"),
		                }),
		              })}
		              style={vectorObject.style}
		            />)
			});

		return (
			<div>{vectorLayers}</div>
		)
	}



	render(){
		return (
			<Map center={fromLonLat(this.state.mapCenter)} zoom={this.props.zoom}>
        		<Layers>
          			<TileLayer source={osm()} zIndex={0} />
          			{this.loadVectorLayers()}
      			</Layers>
      			<Controls>
          			<FullScreenControl />
    			</Controls>
  			</Map>
        )
	}
	
}

export default OpenLayersMap;