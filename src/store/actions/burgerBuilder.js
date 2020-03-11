// only synchronous 
// action creators for adding and removing
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => { 
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
};

export const initIngredients = () => {
  console.log('initIngredients executed');
  return (dispatch) => {
    axios.get('https://react-my-burger-ca83e.firebaseio.com/ingredients.json')
      .then(response => {
        console.log(response.data);
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchIngredientsFailed());
        // throw new Error(error);
      });
  };
};