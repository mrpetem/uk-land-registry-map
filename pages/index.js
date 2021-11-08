import React from "react";
import Head from 'next/head';
import SearchForm from '../components/forms/searchForm';
import moment from 'moment';
import dynamic from 'next/dynamic';

import FeatureStyles from "../components/openLayers/features/styles";
import mapConfig from "../components/openLayers/config.json";
const OpenLayersMap = dynamic(() => import('../components/openLayers/openLayersMap'),{ ssr: false });



export default function Home() {


	// Map Configuration
	const [vectorObjects, setVectorObjects] = React.useState([]);
  	const [mapCenter, setMapCenter] = React.useState(mapConfig.center);
  	const [mapZoom, setMapZoom] = React.useState(7);


	// Form state
	const [state, setState] = React.useState({
		isSubmitting: false, // Whether the form is being submitted
		searchResultCount: 0 // How many total land sale records were found
  	});

  	let startDate = moment().subtract(2,'months');
	let endDate = moment().subtract(1,'months');


  	// Send initial search request to populate the map
  	const [defaultSearchComplete, setDefaultSearchComplete] = React.useState(false);

  	let defaultSearchData = {
	    "startDate": new Date(startDate),
	    "endDate": new Date(endDate),
	    "propertyClassDetached": true,
	    "propertyClassSemiDetached": true,
	    "propertyClassFlat": true,
	    "propertyClassTerrace": true,
	    "propertyClassOther": true
	}

	if(!defaultSearchComplete){
		setDefaultSearchComplete(true);
		sendSearchRequest(defaultSearchData);
	}


  	// Handle search form submission
	function onSearchSubmitHandler(searchData){
		sendSearchRequest(searchData);
	}


	// Submit the actual search request to API and build map layers with response
	async function sendSearchRequest(searchData){
		setState({...state,'isSubmitting': true});

		const res = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(searchData),
		});

		const result = await res.json();

		// Set the styles to be used on map vector layers
		let vectorData = [];

		// The land sale data returned is grouped into feature collections by property classification so that unique styling can be applied per classification on the map
		// We apply the unique style here after getting the search response back from the api
		if(result.result.length){
			result.result.map((geoJsonObject) => {
				vectorData.push({style: FeatureStyles.PropertyClassifications[geoJsonObject.features[0].properties.classificationId], geoJsonObject});
			})
		}

		// Bind the vector layers to be used by the openLayersMap component
		setVectorObjects(vectorData);

		// Update form state
		setState({...state, 'searchResultCount': result.summary.count, 'isSubmitting': false});
	}


	return (
		<div className="container">
			<Head>
				<title>UK Land Registry Map Search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>

				<section className="grid grid-cols-1 md:grid-cols-3 h-screen">

					<div className="flex flex-col justify-between bg-gray-100 border-r-2 border-gray-200 pt-6 pb-4 pl-6 pr-6 md:pt-12 md:pb-6 md:pl-14 md:pr-14">

						<section className="flex-grow">
							<section className="mb-8">
								<h1 className="mb-6 text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
									Search the entire history of property sales in England and Wales.
								</h1>

								<p className="text-sm text-gray-500 mb-4">Contains public sector information licensed under the <a className="hover:underline" target="_BLANK" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.</p>
								<p className="text-sm text-gray-500">Map data provided by &copy; <a className="hover:underline" target="_BLANK" href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a></p>

							</section>


							<section className="mt-3 mb-3">
								<SearchForm 
									onSearchSubmit={onSearchSubmitHandler} 
									isSubmitting={state.isSubmitting} 
									startDate={startDate} 
									endDate={endDate} />
							</section>


							<section className="mt-3 mb-3">
								<h3 className="mb-3 md:text-2xl font-bold tracking-tighter leading-tight">Total sales displayed: {state.searchResultCount.toLocaleString()}</h3>
								<p className="text-xs text-gray-500 mt-1 italic">(results are limited to max. 10,000 for performance)</p>
							</section>

						</section>


						<section className="">
							<p className="text-sm text-gray-500">Built by P Mardell. <a className="hover:underline" target="_BLANK" href="https://github.com/mrpetem/uk-land-registry-map">View source code &raquo;</a></p>
						</section>

					</div>

					<div className="">
						<OpenLayersMap center={mapCenter} zoom={mapZoom} vectorObjects={vectorObjects} />
					</div>

				</section>

			</main>

			<footer>
			</footer>
		</div>
	)
}