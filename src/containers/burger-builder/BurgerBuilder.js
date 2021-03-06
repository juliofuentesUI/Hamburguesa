import React, { Component } from 'react';
import { connect } from 'react-redux';


import Aux from '../../hoc/Aux/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log(`BurgerBuilder has finally mounted`);
    this.props.onInitIngredients();
  }


  updatePurchaseState (ingredients) {
    let purchasable = Object.values(ingredients)
                      .some(element => element > 0);

    // this.setState({ purchasable: purchasable });
    return purchasable;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {

    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients cant be loaded </p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          isAuth={this.props.isAuthenticated}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
          price={this.props.price} />
        </Aux>
      );

      orderSummary = <OrderSummary 
        price={this.props.price}
        purchaseContinued={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        ingredients={this.props.ings} />;
    };

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));