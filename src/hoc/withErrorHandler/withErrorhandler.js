import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorhandler = (WrappedComponent, axios) => {
    return class extends Component {
    
        state = {
            error: null
        }



        UNSAFE_componentWillMount () {
           this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor= axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedhandler = () => {
            this.setState({error: null});
        }
        
        render() {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmedhandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorhandler;