import React from 'react';
import classes from './BurgerControls.module.css';
import IngredientControl from './IngredientControl/IngredientControl';

const burgerControl = (props) => {
  return (
    //Ingredient Control
    <div className={classes.BurgerControls}>
      <IngredientControl/>
    </div>
  );
};

export default burgerControl;