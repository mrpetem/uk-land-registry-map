import React, { useRef } from "react";
import { addDays, subDays } from 'date-fns';
import DateRangePicker from './dateRangePicker';


function SearchForm(props) {

	const isSubmitting = props.isSubmitting;
	const propertyClassDetachedRef = useRef();
	const propertyClassSemiDetachedRef = useRef();
	const propertyClassFlatRef = useRef();
	const propertyClassTerraceRef = useRef();
	const propertyClassOtherRef = useRef();

	let startDate = props.startDate;
	let endDate = props.endDate;



	function onDatesSelectedHandler(startDateVal,endDateVal){
		startDate = startDateVal;
		endDate = endDateVal;
	}



	function submitHandler(event) {
		event.preventDefault();

		const propertyClassDetached = propertyClassDetachedRef.current.checked;
		const propertyClassSemiDetached = propertyClassSemiDetachedRef.current.checked;
		const propertyClassFlat = propertyClassFlatRef.current.checked;
		const propertyClassTerrace = propertyClassTerraceRef.current.checked;
		const propertyClassOther = propertyClassOtherRef.current.checked;

		const searchData = {
			startDate,
			endDate,
			propertyClassDetached,
			propertyClassSemiDetached,
			propertyClassFlat,
			propertyClassTerrace,
			propertyClassOther
		};

		props.onSearchSubmit(searchData);
  	}



  	function getLoadingSpinner(){
  		if(props.isSubmitting){
  			return (
  				<div className="relative">
	  				<div className="absolute flex top-40 left-40 transform">
						<div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900"></div>
					</div>
				</div>
			)
  		}

  		return;
  	}



	return (

	  	<form method="GET" onSubmit={submitHandler}>

	  		{getLoadingSpinner()}

	  		<div className={`${props.isSubmitting ? "opacity-50" : ""}`}>

				<fieldset className="mb-6">

					<legend className="text-base font-medium text-gray-900 mb-1">Date range</legend>

					<DateRangePicker onDatesSelected={onDatesSelectedHandler} />

			    </fieldset>

			    <fieldset className="mb-6">

			        <legend className="text-base font-medium text-gray-900 mb-1">Filter by property classification</legend>

			        <div className="mt-4 space-y-4">

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input ref={propertyClassDetachedRef} id="class-detached" name="class-detached" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked={true} />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="class-detached" className="font-medium text-gray-700">Detached 
								</label>
								<div className="bg-circle-detached ml-6 mt-0.5 h-4 w-4 text-white text-center font-extrabold flex float-right rounded-full"></div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input ref={propertyClassSemiDetachedRef} id="class-semi-detached" name="class-semi-detached" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked={true} />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="class-semi-detached" className="font-medium text-gray-700">Semi-Detached</label>
								<div className="bg-circle-semi-detached ml-6 mt-0.5 h-4 w-4 text-white text-center font-extrabold flex float-right rounded-full"></div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input id="class-flat" ref={propertyClassFlatRef} name="class-flat" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked={true} />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="class-flat" className="font-medium text-gray-700">Flat</label>
								<div className="bg-circle-flat ml-6 mt-0.5 h-4 w-4 text-white text-center font-extrabold flex float-right rounded-full"></div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input id="class-terrace" ref={propertyClassTerraceRef} name="class-terrace" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked={true} />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="class-terrace" className="font-medium text-gray-700">Terrace</label>
								<div className="bg-circle-terrace ml-6 mt-0.5 h-4 w-4 text-white text-center font-extrabold flex float-right rounded-full"></div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input id="class-other" ref={propertyClassOtherRef} name="class-other" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked={true} />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="class-other" className="font-medium text-gray-700">Other</label>
								<div className="bg-circle-other ml-6 mt-0.5 h-4 w-4 text-white text-center font-extrabold flex float-right rounded-full"></div>
							</div>
						</div>

			        </div>
			  	</fieldset>

				<div className="px-4 py-3 text-right sm:px-6 border-t-2 border-gray-200">
					<button disabled={props.isSubmitting} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Update &raquo;
					</button>
				</div>
			</div>

		</form>
	);
}

export default SearchForm;