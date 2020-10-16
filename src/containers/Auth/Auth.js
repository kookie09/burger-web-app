import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true

            }
        };
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
         this.props.onAuth(
             this.state.controls.email.value,
             this.state.controls.password.value,
             this.state.isSignUp);

    };

    switchAuthModehandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: ! prevState.isSignUp
            };
        })
    };

    render() {

        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}

            />

        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit = {this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>
                        Submit
                    </Button>
                </form>
                <Button
                    clicked = {this.switchAuthModehandler} 
                    btnType = "Danger">Switch to {this.state.isSignUp ? 'Sign In' : 'Sign up'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);