// Lior Shlomo 208011197
// Zohar Hazani 209189380

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LocalStorage from './localstorage';
import './reportform.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from "./button";

// Define the ReportForm component as a class component
class ReportForm extends React.Component {
    // Initialize state in the constructor
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            matchingCosts: [],
            showNoReportsFound: false
        };
    }

    // Handle the form submission
    handleSubmit = async (event) => {
        // Reset the showNoReportsFound state
        this.setState({showNoReportsFound: false});
        event.preventDefault();

        // Retrieve the selected date from the state
        const { date } = this.state;

        // If the date is empty or null, show an alert message
        if (date === '' || date === null) {
            alert('Please fill the date field');

        } else {
            // Get the selected month and year
            const selectedMonth = date.getMonth();
            const selectedYear = date.getFullYear();

            // Get the stored costs from local storage and parse the JSON
            const storedCosts = JSON.parse(await LocalStorage.getItem('costs')) || [];

            // Filter the costs by the selected month and year
            const matchingCosts = storedCosts.filter((cost) => {
                const costMonth = new Date(cost.date).getMonth();
                const costYear = new Date(cost.date).getFullYear();

                return costMonth === selectedMonth && costYear === selectedYear;
            });

            // Set the matchingCosts and showNoReportsFound states
            this.setState({ matchingCosts, showNoReportsFound: matchingCosts.length === 0 && date != null });
        }
    };

    // Handle changes to the selected date
    handleDateChange = (date) => {
        this.setState({ date });
    };

    // Render the component
    render() {
        // Destructure the state
        const { date, matchingCosts, showNoReportsFound } = this.state;
        return (
            // Render the form
            <form onSubmit={this.handleSubmit}>
                <label className='dateAndGetReportButton'>
                    <p className='p'>Choose date </p>
                    <DatePicker className='textBoxReport'
                                value={date}
                                selected={date}
                                onChange={this.handleDateChange}
                                id='date'
                                dateFormat='MM/yyyy'
                                showMonthYearPicker
                                placeholderText='mm/yyyy'
                    />
                    <Button className='myButton' type='submit' text='Get Report' />
                </label>

                {/* If matching costs are found, render the table */}
                {matchingCosts.length > 0 && (
                    <div>
                        <br/>
                        <div className='table-container'>
                            <table>
                                <thead>
                                <tr className="tr">
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Sum</th>
                                </tr>
                                </thead>
                                <tbody>
                                {matchingCosts.map((cost) => (
                                    <tr className="tr" key={cost.id}>
                                        <td>{cost.category}</td>
                                        <td>{cost.description}</td>
                                        <td>{cost.sum}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* show no reports found when the length of the matchingCost array is 0 -
                 No reports found in the selected date*/}
                {showNoReportsFound && (
                    <div className='pNoReportFound'>
                        No reports found
                    </div>
                )}
            </form>
        );
    }
}

export default ReportForm;













