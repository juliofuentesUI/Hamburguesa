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
      },
      loading: false
    }
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

    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value="..." />
        <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
        <Input inputtype="input" type="text" name="street" placeholder="Street"/>
        <Input inputtype="input" type="text" name="postal" placeholder="Postal code"/>
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