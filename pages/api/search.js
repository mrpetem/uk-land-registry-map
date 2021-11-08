import clientPromise from '../../lib/mongodb';
import moment from 'moment';
import propertyClassificationMap from '../../lib/propertyClassificationMap';

/**
 * Handles a POST search request and returns any property sales found against the search.
 * 
 * Given user submitted search parameters, validates/sanatizes user input, constructs a database query to return property sale objects discovered from the search. Sale objects will be returned in geoJSON format for convenience.
 * 
 * TODO: Instead of sending geoJSON directly, send as native MongoDB document array, then use an independent service to convert the document to a geoJSON object outside of this component.
 * 
 * 
 * @param {string} 		startDate           		ISO8601 date. Only properties sold from this date period will be returned.
 * @param {string} 		endDate           			ISO8601 date. Only properties sold before (and including) this date period will be returned.
 * @param {bool}        propertyClassDetached 		Whether to include detached properties. Defaults to true.
 * @param {bool}        propertyClassSemiDetached 	Whether to include Semi-detached properties. Defaults to true.
 * @param {bool}        propertyClassFlat 			Whether to include flat properties. Defaults to true.
 * @param {bool}        propertyClassTerrace 		Whether to include terraced properties. Defaults to true.
 * @param {bool}        propertyClassOther 			Whether to include all other property types not defined above. Defaults to true.
 * 
 * @return {Object}		{summary: {count: int}, result: Object[]<geoJSON>}
 * 
 */
export default async function handler(req, res) {

	try{

		const maxResults = 10000; // Maximum number of results to return from a search
		let { startDate, endDate, propertyClassDetached, propertyClassSemiDetached, propertyClassFlat, propertyClassTerrace, propertyClassOther } = req.body;


		/*
		* Validate user params sent
		*/

		// Make sure dates are valid ISO8601 standard
		if(!moment(startDate, moment.ISO_8601).isValid() ||
			!moment(endDate, moment.ISO_8601).isValid()){
			return res.status(400).json({ summary: {count: 0}, result: [], error: 'You sent an invalid start date and/or end date.'});
		}


		/*
		* Build the query to search database from user search params
		*/

		// Clone property classification map to determine which to include in the search
		let propertyClassificationFilter = {...propertyClassificationMap};

		if(!propertyClassDetached){
			delete propertyClassificationFilter['D'];
		}

		if(!propertyClassSemiDetached){
			delete propertyClassificationFilter['S'];
		}

		if(!propertyClassFlat){
			delete propertyClassificationFilter['F'];
		}

		if(!propertyClassTerrace){
			delete propertyClassificationFilter['T'];
		}

		if(!propertyClassOther){
			delete propertyClassificationFilter['O'];
		}

		// If no property classifications were de-selected from search, then there is no need to find them
		let findPropertyClassifications = {};

		// Otherwise the user selected at least one property classification to find, but not all
		if(Object.keys(propertyClassificationFilter).length && 
			Object.keys(propertyClassificationFilter).length != Object.keys(propertyClassificationMap).length){
			findPropertyClassifications = {propertyClassification: { $in: Object.keys(propertyClassificationFilter)}}
		}

		let findParams = {
			...findPropertyClassifications,
			saleDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
		}


		// Perform search in database
		const dbConn = await clientPromise;
		const db = dbConn.db();

		// Run query to find results, order by classification for easier grouping into geoJSON and convert result to array
		const landSaleEntries = await db.collection('propertySales').find(findParams).sort({ saleDate : 1 }).limit(maxResults).toArray();

		const totalResults = landSaleEntries.length;


		/*
		* Start building the geoJSON map features, grouping them by classification
		*/

		// Track which property classifications have been returned, so they can be grouped
		let propertyClassificationObjectsFound = Object.keys(propertyClassificationMap).reduce((acc,key)=> (acc[key]=[],acc),{});


		// Loop over results and group the longitude/latitude per classification type
		for(let landSaleEntry of landSaleEntries){
			propertyClassificationObjectsFound[landSaleEntry.propertyClassification].push([landSaleEntry.lon,landSaleEntry.lat]);
		}


		let mapFeatures = [];

		// Loop over grouped results and prepare as geoJSON feature collection objects, grouped by classification
		for(let classificationId of Object.keys(propertyClassificationMap)){

			// This classification type has no results returned
			if(!propertyClassificationObjectsFound[classificationId].length){
				continue;
			}

			let newMapFeature = {type: "FeatureCollection", features: [{
				"type": "Feature",
				"geometry": {
					"type": "MultiPoint",
					"coordinates": propertyClassificationObjectsFound[classificationId]
				},
				"properties": {
					"classificationId": classificationId,
				}
			}]};

			mapFeatures.push(newMapFeature);
		}


		// Return response object containing results
		res.status(200).json({ summary: {count: totalResults}, result: mapFeatures});
	}catch(err){
		res.status(500).json({ summary: {count: 0}, result: [], error: err});
	}
}