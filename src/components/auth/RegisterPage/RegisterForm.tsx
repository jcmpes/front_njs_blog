import React from 'react';

import styles from './RegisterForm.module.css'

// Regexp to validate email address
const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignUpProps {
    name?: any;
    value?: any;
}

interface SignUpState {
    username : string,
    email : string,
    password : string,
    password_confirmation: string,
    errors : {
       username :  string,
       email : string,
       password : string,
       password_confirmation: string
    }
}

export class RegisterForm extends React.Component<SignUpProps, SignUpState> {

    constructor(props: SignUpProps) {
        super(props);
        const initialState = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
                errors: {
                    username: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username':
                errors.username = value.length < 4 ? 'El nombre de usuario debe tener al menos 4 caracteres!': '';
                break;
            case 'email':
                errors.email = Regex.test(value) ? '' : 'El email no es válido';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'La contraseña deber tener al menos 8 cracteres!': '';
                break;
            case 'password_confirmation':
                errors.password_confirmation = value !== this.state.password ? 'Las contraseñas no coinciden': '';
            default:
                break;
        }
        this.setState(Object.assign(this.state, { errors,[name]: value }));
        console.log(this.state.errors);
}

    handleSubmit = (event : any) => {}

    render() {
        const { errors }  = this.state
        return (
          <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} noValidate >
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="firstName">First Name</label>
                    <input className={styles.input} type='text' name='firstName' onChange={this.handleChange}/>
                  </div>
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="lastName">Last Name</label>
                    <input className={styles.input} type='text' name='lastName' onChange={this.handleChange}/>
                  </div>
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <input className={styles.input} type='text' name='username' onChange={this.handleChange}/>
                    {errors.username.length > 0 && <span className={styles.error}>{errors.username}</span>}
                  </div>
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type='email' name='email' onChange={this.handleChange}/>
                    {errors.email.length > 0 && <span className={styles.error}>{errors.email}</span>}
                  </div>
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input className={styles.input} type='password' name='password' onChange={this.handleChange}/>
                    {errors.password.length > 0 && <span className={styles.error}>{errors.password}</span>}
                  </div>     
                  <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="password_confirmation">Confirm Password</label>
                    <input className={styles.input} type='password' name='password_confirmation' onChange={this.handleChange}/>
                    {errors.password_confirmation.length > 0 && <span className={styles.error}>{errors.password_confirmation}</span>}
                  </div>          
                  <div className={styles.submit}>
                    <button className={styles.button}>Register</button>
                  </div>
                </form>
            </div>
        </div>
     );
    }
}