import React from 'react';
import './CustomSelect.css';
import PropTypes from 'prop-types';

/**
 * Select with dynamic value, name, options 
 * and onChange handler
 * 
 * @param {*} props 
 */
export default function CustomSelect(props) {
  const {onChange, options, value, name} = props;

  return (
    <select className="uk-select" name={name} value={value} onChange={onChange}>
      { options &&
        options.map((option, index) => (
          <option key={index} value={option.value}>{option.name}</option>
        ))
      }
    </select>
  )
}

CustomSelect.defaultProps = {
  options: [],
  value: '',
  name: '',
  onChange: () => null
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};