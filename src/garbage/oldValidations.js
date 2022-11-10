        // if (!(/\d/g.test(displayedCharacters))) {     displayedCharacters = '' } if
        // (isNumber(eventTargetValue) || operatorsRegex.test(eventTargetValue)) { //
        // prevent multiple zeros at the beginning     displayedCharacters =
        // displayedCharacters === '0' && eventTargetValue !== '.'         ? '' :
        // displayedCharacters;     // prevent adding multiple decimals at a time let
        // newValue = eventTargetValue === '.' && displayedCharacters .toString()
        // .slice(-1) == '.'         ? ''         : eventTargetValue;     let
        // updatedDisplayedCharacters = displayedCharacters + newValue;
        // this.setState({displayedCharacters: updatedDisplayedCharacters})     if
        // (!isNumber(eventTargetValue) &&
        // operatorsRegex.test(displayedCharacters.toString().slice(-1))) {
        // updatedDisplayedCharacters = displayedCharacters.slice(0, -1) +
        // eventTargetValue;         this.setState({displayedCharacters:
        // updatedDisplayedCharacters})     }     let lastChar =
        // displayedCharacters.split(/[+|-|/|\*]/);     this.setState({latestInput:
        // lastChar}) } else {



        // another way of creating the buttons, rather than using input tags
        //                 calculatorKeys = calculatorKeys.map((calcKey) => (

        //                     <button
        //                     key={calcKey.id}
        //                         disabled={calcKey.btnCharacter === 'ON'
        //                         ? false
        //                         : !calculatorIsOn}
        //                         onClick={this.displayedCharactersHandler}
        //                         className={`button ${calcKey.buttonColor}`}

        //                         id={calcKey.id}
        //                         value={calcKey.btnCharacter}>{calcKey.btnCharacter} </button>
        //             ));