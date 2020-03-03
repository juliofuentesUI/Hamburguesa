import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      }, 
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '' 
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '' 
      },

      email:  {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '' 
      },
      deliveryMethod:  {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'cheapest'}
          ]
        },
        value: '' 
      }
    },
    loading: false
  }


  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: 'JULIOOO',
          address: {
            street: 'Teststreet 1',
            zipCode: '431351',
            country: 'USA'
          },
          email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
      };

      axios.post('/orders.json', order)
        .then(response => {
          this.setState({loading: false });
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({ loading: false });
        });
  }

  render() {

    // const { orderForm } = this.state;

    // const formFields = [];

    // for (let key in orderForm) {
    //   const elType = orderForm[key].elementType;
    //   const elConfig = orderForm[key].elementConfig;
    //   const value = orderForm[key].value;

    //   if (elType === 'input') {
    //     formFields.push(<Input elementType={elType} elementConfig={{...elConfig}} value={value} />);
    //   } 

    //   if (elType === 'select') {
    //     formFields.push(<Input elementType={elType}  />);
    //   }
    // }

    //HIS WAY
    //
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    // deliveryMethod:  {
    //   elementType: 'select',
    //   elementConfig: {
    //     options: [
    //       {value: 'fastest', displayValue: 'Fastest'},
    //       {value: 'cheapest', displayValue: 'cheapest'}
    //     ]
    //   },

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            value={formElement.config.value}
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType} />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
      </div>
    );
  }

}

export default ContactData;