import React from 'react';
import Router from 'next/router';
import { login, register } from '../../../api/auth';

import styles from '../../../../styles/Auth.module.css';

// Regexp to validate email address
const Regex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

interface SignInProps {
    name?: any;
    value?: any;
}

interface SignInState {
    email : string,
    password : string,
}

export class LoginForm extends React.Component<SignInProps, SignInState> {

    constructor(props: SignInProps) {
        super(props);
        const initialState = {
            password: '',
            email: '',
            remember: true,
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event : any) => {
        event.preventDefault();
        this.setState((prevState) => ({
            ...prevState,
            [event.target.name]:
              event.target.name === 'remember' ? event.target.checked : event.target.value,
        }))
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        login(this.state).then(user => console.log(user)).catch(err => console.log)
    }

    render() {

        return (
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2>Log In</h2>
                    <form onSubmit={this.handleSubmit}>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input className={styles.input} type='email' name='email' onChange={this.handleChange}/>
                    </div>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input className={styles.input} type='password' name='password' onChange={this.handleChange}/>
                    </div>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="remember">Remember me</label>
                        <input className={styles.input} type='checkbox' name='remember' onChange={this.handleChange}/>
                    </div>
                    <div className={styles.submit}>
                        <button className={styles.button}>Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}