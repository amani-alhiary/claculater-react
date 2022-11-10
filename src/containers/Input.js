import React, {Component} from 'react';

class Input extends Component {
    componentDidMount() {
        document.addEventListener('keypress', this.getKeyboardChar)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.getKeyboardChar);
    }

    getKeyboardChar = (event) => {
        
        event = event || window.event;
        let charCode = event.keyCode || event.which;
        let charStr = String.fromCharCode(charCode);
        if (charStr == this.props.btncharacter) {
            this.inputValueHandler()
        }
        // alert(charStr);
    }
    render() {
        return (<input {...this.props}/>)
    }
}

export default Input;