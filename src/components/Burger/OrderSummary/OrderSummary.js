import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>)
        })
    return (
      <React.Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </React.Fragment>
    );
  }
}; 

export default OrderSummary;