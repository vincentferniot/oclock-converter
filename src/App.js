import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './components/Loader';
import CustomSelect from './components/CustomSelect';
import useFetchData from './libs/useFetchData';
import useConverter from './libs/useConverter';
import {useDebounce} from 'use-debounce';

// could be part of a separate file Constant.js
const DEFAULT_CURRENCY = 'EUR';

function App() {
  const [amount, setAmount] = useState('');
  const [startCurrency, setStartCurrency] = useState(DEFAULT_CURRENCY);
  const [endCurrency, setEndCurrency] = useState('');
  const [symbolSelectOptions, setSymbolSelectOptions] = useState([]);
  
  const {symbols} = useFetchData('symbols');
  const [debouncedAmount] = useDebounce(amount, 300);
  const result = useConverter(debouncedAmount, startCurrency, endCurrency);

  /**
   * sets symbolSelectOptions when symbols are available
   */
  useEffect(() => {
    if (symbols) {
      const options = Object.keys(symbols).map((value, index) => {
        if (index === 0) {
          return {
            name: '--- Select from currencies ---',
            value: ''
          }
        }
        return {
          name: symbols[value],
          value
        }
      });
    
      setSymbolSelectOptions(options);
    }
  }, [symbols]);

  /**
   * handler for changes in converter form and
   * sets corresponding state in function of event.target.name
   * @param {*} event
   */
  const handleChange = (event) => {
    event.preventDefault();
    const {value, name} = event.target;

    switch(name) {
      case 'amount':
        setAmount(value);
        break;
      case 'startCurrency':
        setStartCurrency(value);
        break;
      case 'endCurrency':
        setEndCurrency(value);
        break;
      default:
    }
  }

  return (
    <div className="App">
      <Loader visible={!symbols}>
        <p>loading currencies...</p>
      </Loader>
      <header className="App-header">
        <img src={logo} className="uk-legend  App-logo-converter" alt="logo" /> 
      </header>
      <div className="App-body">
        <form className="App-form uk-form-stacked">
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <div className="uk-margin">
                <div className="uk-form-label">Amount</div>
                <input placeholder="0,00" className="uk-input" type="number" name="amount" value={amount} onChange={handleChange} />
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-form-label">Starting currency</div>
              <div className="uk-form-controls">
                <CustomSelect name="startCurrency" value={startCurrency} onChange={handleChange} options={symbolSelectOptions} />
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-form-label">Convert to</div>
              <div className="uk-form-controls">
                <CustomSelect name="endCurrency" value={endCurrency} onChange={handleChange} options={symbolSelectOptions} />
              </div>
            </div>
            
            {/* -- first try --
            <label>
              Combien ?
              <input className="uk-input" type="number" name="amount" value={amount} onChange={handleChange} />
            </label>
            <label>
              De quoi ?
              <CustomSelect name="startCurrency" value={startCurrency} onChange={handleChange} options={symbolSelectOptions} />
            </label>
            <label>
              En quoi ?
              <CustomSelect name="endCurrency" value={endCurrency} onChange={handleChange} options={symbolSelectOptions} />
            </label> */}
          </fieldset>
        </form>
      </div>
      <footer>
          <div className={"App-result " + (result ? 'slide-up' : 'slide-down')}>
            { result &&
              <div>
                <strong>{result}</strong> {endCurrency}
              </div>
            }
          </div>
      </footer>
    </div>
  );
}

export default App;
