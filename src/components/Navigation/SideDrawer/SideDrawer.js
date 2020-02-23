import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/BackDrop/Backdrop';

const sideDrawer = (props) => {
  // ... conditionally attach css classes.
  return (
    <React.Fragment>
      <Backdrop show clicked={props.closed}/>
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;