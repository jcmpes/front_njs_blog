import React from 'react';
import { register } from '../../../api/auth';

import styles from '../../../../styles/Auth.module.css';
import { toast } from 'react-toastify';

// Regexp to validate email address
const Regex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

interface SignUpProps {
  name?: any;
  value?: any;
}

interface SignUpState {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export class RegisterForm extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      password: '',
      email: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      username: '',
      errors: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'username':
        errors.username =
          value.length < 4
            ? '❗️El nombre de usuario debe tener al menos 4 caracteres!'
            : '';
        break;
      case 'email':
        errors.email = Regex.test(value) ? '' : '❗️El email no es válido';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? '❗️La contraseña deber tener al menos 8 cracteres!'
            : '';
        break;
      case 'password_confirmation':
        errors.password_confirmation =
          value !== this.state.password
            ? '❗️Las contraseñas no coinciden'
            : '';
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach((val) => {
      val.length > 0 && (validity = false);
    });
    if (validity == true) {
      const userData = { ...this.state };
      delete userData.errors;
      console.log('userData: ', userData);
      register(userData).then((response) => {
        if (response.email && Array.isArray(response.email)) {
          toast.error(`Email: ${response.email}`);
        }
        if (response.username && Array.isArray(response.username)) {
          toast.error(`Username: ${response.username}`);
        }
        if (response.password && Array.isArray(response.password)) {
          toast.error(`Password: ${response.password}`);
        }

        if (response.username && !Array.isArray(response.username)) {
          const toastOptions = {
            onClose: () => (window.location.href = '/login'),
            autoClose: 2000,
          };
          toast.success(`🥳 Hooray! Welcome ${response.username}`, toastOptions);
        }
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="first_name">
                First Name
              </label>
              <input
                className={styles.input}
                type="text"
                name="first_name"
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="last_name">
                Last Name
              </label>
              <input
                className={styles.input}
                type="text"
                name="last_name"
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                type="text"
                name="username"
                onChange={this.handleChange}
              />
              {errors.username.length > 0 && (
                <span className={styles.error}>{errors.username}</span>
              )}
            </div>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                name="email"
                onChange={this.handleChange}
              />
              {errors.email.length > 0 && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="password_confirmation">
                Confirm Password
              </label>
              <input
                className={styles.input}
                type="password"
                name="password_confirmation"
                onChange={this.handleChange}
              />
              {errors.password_confirmation.length > 0 && (
                <span className={styles.error}>
                  {errors.password_confirmation}
                </span>
              )}
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
