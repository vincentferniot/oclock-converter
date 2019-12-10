import React from 'react';
import './Loader.css';
import logo from '../../logo.svg';
import PropTypes from 'prop-types';

/**
 * Permissive Loader that accepts all kind of children
 * to inform user of current state. By default it displays
 * "Chargement"
 * 
 * @param {*} props 
 */
export default function Loader(props) {
  return (
    <div className={`Loader ${!props.visible && 'slide-out'}`} >
      <img src={logo} className="App-logo" alt="logo" />
      {props.children || 'Chargement'}
    </div>
  )
}

Loader.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.element
};