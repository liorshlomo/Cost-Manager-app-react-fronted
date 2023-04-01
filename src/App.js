// Lior Shlomo 208011197
// Zohar Hazani 209189380

import React, { useState } from 'react';
import Button from './button';
import './App.css';
import AddCostItemForm from './addcostitemform';
import ReportForm from "./reportform";
import LocalStorage from './localstorage';

// This code defines a functional component called "App" that renders the main application view.
// The component uses React hooks to manage the state of the application,
// including the last clicked button, and whether to show the add cost or report form.

function App() {
    const [lastClickedButton, setLastClickedButton] = useState(null);
    const [showAddCostForm, setShowAddCostForm] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);

    // Handle button click event
    // It takes in the text of the button as an argument, which is then used to determine which button was clicked.
    // If the text of the button is "Add cost", the state variable showAddCostForm is set to true and showReportForm is set to false.
    // This will cause the AddCostItemForm component to be displayed on the page, and the opposite with the other button, Get Report.

    const handleButtonClick = (buttonText) => {
        setLastClickedButton(buttonText);
        if (buttonText === 'Add cost') {
            setShowAddCostForm(true);
            setShowReportForm(false);
        } else if (buttonText === 'Get a report') {
            setShowReportForm(true);
            setShowAddCostForm(false);
        }
    };

    // Handle form submission event after a cost was added
       const handleSubmit =  (costItem) => {

           if (costItem.date === '' || costItem.date === null) {
               const today = new Date();
               costItem.date = today.toISOString();
           }
        // Get existing cost items from local storage or initialize an empty array
        LocalStorage.getItem('costs').then(costs=>{
            let currentCosts=[];
            if (costs) {
                currentCosts = JSON.parse(costs);
            }
            // Store the updated array back in local storage
            currentCosts.push(costItem);
            LocalStorage.setItem('costs',JSON.stringify(currentCosts)).then(res=>{
                console.log(res);
            })

        })
    };

    // Render the main component
    return (
        <div className='App'>
            <header className='App-header'>
                <div className='buttons'>
                    <img className='img' src="Revenue2.png" alt="Cost Manager"/>
                    <h1 className='costManagerHeader'>Cost Manager</h1>
                    <Button text='Add cost' onClick={handleButtonClick}/>
                    <Button text='Get a report' onClick={handleButtonClick}/>
                </div>
                {showAddCostForm && (
                    <div>
                        <br/>
                        <AddCostItemForm onSubmit = {handleSubmit} />
                    </div>
                )}
                {showReportForm && (
                    <div>
                        <br/>
                        <ReportForm />
                    </div>
                )}
                <div className='about'>
                    <p > Cost Manager 2023</p>
                    <p> Lior Shlomo, Zohar Hazani</p>
                </div>
            </header>
        </div>
    );
}

export default App;


