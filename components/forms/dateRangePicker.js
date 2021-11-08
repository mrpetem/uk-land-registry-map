import { Component } from "react";
import moment from 'moment';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker as ReactDatesPicker } from "react-dates";


class DateRangePicker extends Component {
	
	state = {
		startDate: moment().subtract(2, 'months'),
		endDate: moment().subtract(1,'months'),
		focusedInput: null
	};


	onDatesChangeHandler = (startDate, endDate) => {
		this.setState({ startDate, endDate });
        this.props.onDatesSelected(startDate, endDate);
    }


	renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {

	    let i;
	    let years = [];

	    for(i = moment().year(); i >= moment().year() - (moment().year() - 2017); i--) {
	        years.push(<option value={i} key={`year-${i}`}>{i}</option>)
	    }

	    return (
	        <div style={{ display: "flex", justifyContent: "center", 'font-size': '11px' }}>
	            <div>
	                <select value={month.month()} onChange={e => onMonthSelect(month, e.target.value)}>
	                    {moment.months().map((label, value) => (
	                        <option value={value} key={value}>{label}</option>
	                    ))}
	                </select>
	            </div>
	            <div>
	                <select value={month.year()} onChange={e => onYearSelect(month, e.target.value)}>
	                    {years}
	                </select>
	            </div>
	        </div>
	    )
	}


	render() {

		return (
			<ReactDatesPicker
				renderMonthElement={this.renderMonthElement}
				displayFormat={() => "DD/MM/YYYY"}
				startDatePlaceholderText={'from'}
				endDatePlaceholderText={'to'}
				keepOpenOnDateSelect={true}
				required={true}
				minDate={moment('2017-01-01')}
				maxDate={moment()}
				isOutsideRange={day => {
					if (moment().diff(day) < 0) {
						return true;
					}
					return moment(day) >= moment();
				}}
				transitionDuration={0}
				startDateId="startDate"
				endDateId="endDate"
				startDate={this.state.startDate}
				endDate={this.state.endDate}
				onDatesChange={({ startDate, endDate }) => {
					this.setState({ startDate, endDate });
					this.onDatesChangeHandler(startDate, endDate);
				}}
				focusedInput={this.state.focusedInput}
				onFocusChange={focusedInput => {
					this.setState({ focusedInput });
				}}
			/>
		);
	}
}

export default DateRangePicker;