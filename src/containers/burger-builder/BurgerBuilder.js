import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from './../../components/Burger-Controls/BurgerControls';
import ControlsContext from './../../context/ControlsContext';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  incrementIngredient = (type) => {
    console.log(`added one to ${type} `);
    this.setState((prevState, props) => {
      prevState.ingredients[type]++;
      return {...prevState};
    });
  };

  decrementIngredient = (type) => {
    if (this.state.ingredients[type] === 0) return;

    this.setState(prevState => {
      prevState.ingredients[type]--;
      return {...prevState};
    });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <ControlsContext.Provider 
          value={{ingredients: {...this.state.ingredients}, 
          add:(type) => {this.incrementIngredient(type)}, 
          subtract: (type) => {this.decrementIngredient(type)}}}
        >
          <BurgerControls/>
        </ControlsContext.Provider>
      </Aux>
    );
  }
};

export default BurgerBuilder;