import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  // UNSAFE_componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     //each entry has ['salad', '1']
  //     if (param[0] === 'price') {
  //         price = param[1];
  //     } else {
  //         ingredients[param[0]] = +param[1];
  //     }

  //   }

  //   this.setState({ingredients, price});
  // }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary  
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ings}/>
        <Route 
          path={this.props.match.path + '/contact-data' } 
          component={ContactData} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients
  }
};
//YOU DON'T NEED MAPDISPATCHTOPROPS, this component
//only reads state, not dispatches changes to it.
// const mapDispatchToProps = (state) => {

// };

export default connect(mapStateToProps)(Checkout);
