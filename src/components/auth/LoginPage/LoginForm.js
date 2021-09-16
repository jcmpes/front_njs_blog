import React from 'react';
import Link from 'next/link';

import styles from '../../../../styles/Auth.module.css';

// Regexp to validate email address
const Regex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

const LoginForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = React.useState({
    password: '',
    email: '',
    remember: true,
  });

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxField}>
            <label className={styles.label} htmlFor="remember">
              Remember me
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="remember"
              onChange={handleChange}
            />
          </div>
          <div className={styles.submit}>
            <button className={styles.button}>Submit</button>
          </div>
          <Link href="/register">
          <a style={{cursor: "default"}}>Want to <span style={{ cursor: "pointer", color: "green" }}>register</span> a new user?</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
