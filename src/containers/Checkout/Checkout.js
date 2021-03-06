import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
    let summary = <Redirect to="/" />

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ?  <Redirect to ="/"/> : null;
      summary = (
        <div>
          {purchasedRedirect}
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

    return summary;
  }
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};



export default connect(mapStateToProps)(Checkout);
