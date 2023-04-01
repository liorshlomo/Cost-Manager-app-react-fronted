import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    // Handling button click event
    handleClick = () => {
        // Calling parent component's onClick function with the button text
        this.props.onClick(this.props.text);
    };

    render() {
        return (
            // The text displayed on the button is determined by the props passed to the component.
            // If the "text" prop is truthy (i.e., it has a value),
            // the text displayed on the button will be the value of that prop.
            // Otherwise, the text displayed on the button will be the value of the "buttonText" property
            // stored in the component's state.
            <button className='myButton' onClick={this.handleClick}>
                {this.props.text ? this.props.text : this.state.buttonText}
            </button>
        );
    }
}

export default Button;
