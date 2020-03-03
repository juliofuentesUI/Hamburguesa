import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render () {
    let orders = <Spinner/>;

    if (!this.state.loading) {
      orders = this.state.orders.map(order => (
        <Order 
            price={order.price}
            ingredients={order.ingredients}
            key={order.id} />
        ));
    }


    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);