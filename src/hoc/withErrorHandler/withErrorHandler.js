import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        //If this instance of axios ever detects an error response
        // then it will execute THIS callback, which will set error to true and
        //display a modal.
        this.setState({ error });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };


    render() {

      return (
        <Aux>
          <Modal 
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;