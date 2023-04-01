// Lior Shlomo 208011197
// Zohar Hazani 209189380

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './addcostitem.css';
import Button from './button';

// This file contains a React component class called "AddCostItemForm" that allows the user to add new expense items to a list.
// The component consists of a form that collects the user's input for the sum, category, description, and date of the expense.
// It utilizes React state and event handling to manage and update the form inputs, and passes the input data to a callback
// function passed as a prop to the component upon form submission.
// Overall, the "AddCostItemForm" component provides a user-friendly interface for adding new expense items to a larger expense list.

class AddCostItemForm extends React.Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            sum: '',
            category: '',
            description: '',
            date: '',
        };

    }

    // Define handleSubmit function to handle form submission
    handleSubmit = (event) => {
        event.preventDefault();
        // Display success message
        alert('Cost added successfully');



        // Call the onSubmit function passed as a prop and pass the current state as an argument
        this.props.onSubmit(this.state);
        // Reset the state values to empty strings
        this.setState({ sum: '', category: '', description: '', date: '' });
    };

    // Define handleCategoryChange function to handle category selection
    handleCategoryChange = (event) => {
        // Set the category value to the selected option's value
        this.setState({ category: event.target.value });
    };

    // Define handleDateChange function to handle date selection
    handleDateChange = (date) => {
        // Set the date value to the selected date
        this.setState({ date: date });
    };

    // Define handleInputChange function to handle input field changes
    handleInputChange = (event) => {
        // Extract the name and value of the changed input field
        const { name, value } = event.target;
        // Update the corresponding state value using computed property names
        this.setState({ [name]: value });
    };

    // This is the render method of the AddCostItemForm component,
    // which returns a form with inputs for the user to add a new cost item.
    render() {
        const { sum, category, description, date } = this.state;
        // Define an array of categories
        const categoryArr = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <p className='p'>Sum </p>
                    <input
                        className='textBox'
                        type='number'
                        name='sum'
                        value={sum}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <p className='p'>Category </p>
                    <select
                        className='scrollBar'
                        name='category'
                        value={category}
                        onChange={this.handleCategoryChange}
                        required
                    >
                        <option className='chooseOption' value=''>
                            Choose an option..
                        </option>
                        {categoryArr.map((categoryItem, index) => (
                            <option key={index} value={categoryItem}>
                                {categoryItem}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    <p className='p'>Description </p>
                    <input
                        className='textBox'
                        type='text'
                        name='description'
                        value={description}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <p className='p'>Choose date </p>
                    <DatePicker
                        className='textBox'
                        name='date'
                        selected={date}
                        onChange={this.handleDateChange}
                        dateFormat='dd/MM/yyyy'
                        placeholderText='dd/mm/yyyy'
                    />
                </label>
                <br />
                <Button className='myButton' type='submit' text='Add Cost Item' />
            </form>
        );
    }
}

export default AddCostItemForm;





