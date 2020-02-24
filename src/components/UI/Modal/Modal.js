import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../BackDrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextProps.show === this.props.show || nextProps.loading === this.props.loading) {
    //   return false;
    // } else {
    //   return true;
    // }
    //THE ABOVE CAN ALL BE SHORTENED TO THIS
    // return nextProps.show !== this.props.show || nextProps.loading;
    return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    // return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(`[Modal.js] getSnapshotBeforeUpdate`);
    return null;
  }

  componentDidUpdate() {
    console.log(`[Modal.js] DID update`);
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div 
          className={classes.Modal}
          style={{
            transform: (this.props.show) ? 'translateY(0)': 'translateY(-100vh)',
            opacity: (this.props.show) ? '1': '0'
          }}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}; 

export default Modal;