import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey}/>
      });
    })
    .reduce((prevValue, currentValue) => {
        return prevValue.concat(currentValue);
    }, []);


  transformedIngredients = 
    transformedIngredients.length ? transformedIngredients : <p>Please add ingredients</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default withRouter(burger);

//BELOW IS MY VERSION. LETS SEE HOW HE DOES HIS.

// const burger = (props) => {
//   const transformedIngredients = Object.keys(props.ingredients)
//     .map(ingredient => {
//       return {
//         ingredient: ingredient,
//         count: props.ingredients[ingredient]
//       }
//     });
//   console.log('transformedIngredients', transformedIngredients);

//   return (
//     <div className={classes.Burger}>
//       <BurgerIngredient type="bread-top"/>
//         {transformedIngredients.map(ingredient => {
//           if (ingredient.count > 1) {
//             let ingredientArray = [];
//             for(let i = 0; i < ingredient.count; i++) {
//               ingredientArray.push(<BurgerIngredient type={ingredient.ingredient} key={ingredient.ingredient + i}/>);
//             }
//             return ingredientArray;
//           } else {
//             return <BurgerIngredient key={ingredient.ingredient + 0} type={ingredient.ingredient}/>
//           }
//         })}
//       <BurgerIngredient type="bread-bottom"/>
//     </div>
//   );
// };

// export default burger;

