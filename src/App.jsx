import React, {Component} from 'react';
import './App.css';
import CalculatorContainer from './containers/calculatorContainer/calculatorContainer';

class App extends Component {
  render() {
    return (
      <div className='calc-body'>
      
        <CalculatorContainer/>
    
      </div>
    );
  }
}

export default App;
