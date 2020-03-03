import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: null,
    price: 0
  }

  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //each entry has ['salad', '1']
      if (param[0] === 'price') {
          price = param[1];
      } else {
          ingredients[param[0]] = +param[1];
      }

    }
    this.state = {ingredients, price};
    //CANNOT SETSTATE of a component that is not yet mounted. assign it directly. 
    // this.setState({ingredients, price});
  }
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
          ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + '/contact-data' } render={(props) => (<ContactData {...props} price={this.state.price} ingredients={this.state.ingredients} />)} />
      </div>
    );
  }
};

export default Checkout;
