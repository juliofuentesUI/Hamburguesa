
import React, { useContext } from 'react';
import classes from './IngredientControl.module.css';
import ControlsContext from './../../../context/ControlsContext';


const IngredientControl = (props) => {

  const controlsContext = useContext(ControlsContext);

  console.log(`ControlsContext is here`, controlsContext);

  let controls = Object.keys(controlsContext.ingredients)
                .map(element => {
                  return (
                  <div className={classes.IngredientControl}>
                    <span>{element}</span>
                    <button 
                      onClick={() => {controlsContext.add(element)}}>
                    +</button>
                    <button 
                      onClick={() => {controlsContext.subtract(element)}}
                    >
                      -
                    </button>
                  </div>
                  )
                });

  return (
    //Ingredient Control
    <div className={classes.IngredientControl}>
      {controls}
    </div>
  );
};

export default IngredientControl;