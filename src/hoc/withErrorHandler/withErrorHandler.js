import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {

    constructor(props) {
      super(props);
      console.log(`withErrorHandler constructor is running rn`);

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        //If this instance of axios ever detects an error response
        // then it will execute THIS callback, which will set error to true and
        //display a modal.
        this.setState({ error });
      });
    }

    state = {
      error: null
    }


    componentDidMount() {
      console.log(`WithErrorHandler has finally mounted`);
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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