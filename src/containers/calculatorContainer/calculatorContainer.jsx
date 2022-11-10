import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree,  enterKeyCodeCharacter, removeExtraDecimalsInStrings} from '../../utility/utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        displayedCharacters: '',
        trigIsDegree: true,
        calculatorIsOn: true,
        error: false
    }

 
   

    displayedCharactersHandler = (event) => {
        try {
            let {displayedCharacters, trigIsDegree} = this.state;

            const operatorsRegex = /[+-/*%]/;
            //event.target gives you the native DOMNode, then you need to use the regular DOM APIs to access attributes. For instance getAttribute or dataset
            let {value: eventTargetValue} = event.target;

            // change X to * for evaluating multiplication and 'MOD' for modulus
            // eslint-disable-next-line
            eventTargetValue = eventTargetValue == 'X'
                ? '*'
                // eslint-disable-next-line
                //Modulo operator helps us to find the remainder of the two numbers.
                : eventTargetValue == 'MOD'
                    ? '%'
                    : eventTargetValue;

         
            // dont allow more than 40 characters in the display
            if (displayedCharacters.length >= 40) {
                displayedCharacters = displayedCharacters.slice(0, -1);
            }
            switch (eventTargetValue) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                    // disallow multiple zeros starting
                    displayedCharacters = displayedCharacters === '0' && eventTargetValue !== '.'
                        ? ''
                        : displayedCharacters;
                    
                        //remove more than one decimal
                    let updatedButtonValues = displayedCharacters + eventTargetValue;
                    updatedButtonValues = removeExtraDecimalsInStrings(updatedButtonValues);
                    this.setState({displayedCharacters: updatedButtonValues});
                    break;

                case '+':
                case '-':
                case '/':
                case '*':
          
                    let updatedOperationChars = displayedCharacters + eventTargetValue;
                    //define the last char.
                    let lastChar = displayedCharacters
                        .toString()
                        .slice(-1);
                    //test on last character if it is an operator then
                    if (operatorsRegex.test(lastChar)) {
                        updatedOperationChars = displayedCharacters
                            .toString()
                            .slice(0, -1) + eventTargetValue;
                    }
                    this.setState({displayedCharacters: updatedOperationChars});
                    break;

                case 'COS':
                    let cosResult = trigIsDegree
                        ? MathInDegree.cos(displayedCharacters)
                        : Math.cos(displayedCharacters);
                    this.setState({displayedCharacters: cosResult});
                    break;

                case 'SIN':
                    let sinResult = trigIsDegree
                        ? MathInDegree.sin(displayedCharacters)
                        : Math.sin(displayedCharacters);
                    this.setState({displayedCharacters: sinResult});
                    break;

                case 'TAN':
                    let tanResult = trigIsDegree
                        ? MathInDegree.tan(displayedCharacters)
                        : Math.tan(displayedCharacters);
                    this.setState({displayedCharacters: tanResult});
                    break;

            

               
                case 'DEL':
                case 'D':
                case 'd':
                    //if length more than 1 then it reterns it to zero
                    let updatedValue;
                    updatedValue = displayedCharacters.length > 1
                        ? displayedCharacters
                            .toString()
                            .slice(0, -1)
                        : '0';

                    this.setState({displayedCharacters: updatedValue});
                    break;

                case '(':
                case ')':
                    displayedCharacters = displayedCharacters === '0' && eventTargetValue === '('
                        ? ''
                        : displayedCharacters;
                    this.setState({
                        displayedCharacters: displayedCharacters + eventTargetValue
                    });
                    break;

                case '=':

                //display the result from state
                case enterKeyCodeCharacter:
                    // eslint-disable-next-line
                    this.setState({displayedCharacters: eval(displayedCharacters), evaluated: true});
                    break;

                case 'π':
                    let pi = Math
                        .PI
                        .toFixed(2);
                    if (/\D$/.test(displayedCharacters)) {
                        this.setState({
                            displayedCharacters: displayedCharacters + pi.toString()
                        });
                    } else {
                        this.setState({
                            displayedCharacters: pi.toString()
                        });
                    };
                    break;
             
                    case 'SQR':
                        this.setState({
                            displayedCharacters: Math.pow(displayedCharacters, 2)
                        });
                        break;
                     case '^':
                            this.setState({
                                displayedCharacters: displayedCharacters + '**'
                            });
                            break;
        
               
              
                default:
                    this.setState({displayedCharacters: displayedCharacters});

            }
        } catch (error) {
            this.setState({displayedCharacters: error, error: true, calculatorIsOn: false})
        }
    }

   

    render() {
        const {calculatorIsOn, calculatorKeysArray, calculatorKeysArrayInverse, trigsAreInverse} = this.state;
        let calculatorKeys = trigsAreInverse
            ? calculatorKeysArrayInverse
            : calculatorKeysArray





            //display calculater keys
        calculatorKeys = calculatorKeys.map((calcKey) => (
            <span key={calcKey.id}>
                <input
                    disabled={calcKey.btnCharacter === 'ON'
                    ? false
                    : !calculatorIsOn}
                    onClick={this.displayedCharactersHandler}
                    className={`button ${calcKey.buttonColor}`}
                    type="button"
                    id={calcKey.id}
                    value={calcKey.btnCharacter}/></span>
        ));

        // change font size of display dynamicaly. if there is error, make it smaller,
        // so, it can e big enough to contain the error messages, otherwise, keep the
        // default

        let displayFont = this.state.error
            ? '17px'
            : ''



        return (
            <div className='container'>

                <div className='calculatorScreen'>
                    <div
                        id='display'
                        style={{
                        fontSize: displayFont
                    }}>
                        {this
                            .state
                            .displayedCharacters
                            .toString()
                            .replace(/\*\*/g, '^')
                            .replace(/\*/g, '×')
                            .replace(/-/g, '−')}
                    </div>

                </div>

               

                <div id='buttons'>{calculatorKeys}</div>
            </div>

        );
    }
}

export default CalculatorContainer;
