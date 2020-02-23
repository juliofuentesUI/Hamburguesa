import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img onClick={props.opened} src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;