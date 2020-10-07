import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert("you continue");
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Abhishek",
                address: {
                    street: "13 Antill Rise",
                    suburb: "Epping",
                    state: "Victoria",
                    postCode: 3076,
                },
                email: "abhishek@gmail.com"
            }
        }

        axios.post('/orders.json', order).then(
            response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));

    }


    render() {
        let form = (<form>
            <input className={classes.Input}
                type='text'
                name='name'
                placeholder='Your Name '
            />
            <input className={classes.Input}
                type='email'
                name='email'
                placeholder='your Email'
            />
            <input className={classes.Input}
                type='text'
                name='street'
                placeholder='Street'
            />
            <input className={classes.Input}
                type='text'
                name='Postal'
                placeholder='Postal Code'
            />
            <Button btnType="Success" clicked={this.orderHandler}>Place Order</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;