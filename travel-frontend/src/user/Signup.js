import React, { useState } from 'react';
import { signup } from '../auth';
import '../App.css';
import { Link } from 'react-router-dom';
import { API } from '../config';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
    error: '',
  });

  const { name, email, password, success, error } = values;

  const onChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setValues({ ...values, error: false });
  //   signup({ name, email, password }).then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error, success: false });
  //     } else {
  //       setValues({
  //         name: '',
  //         email: '',
  //         password: '',
  //         error: '',
  //         success: true,
  //       });
  //     }
  //   });
  // };
  const signupnow = (name, email, password, error) => {
    console.log(name, email, password, error);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });
    signupnow(name, email, password, error);
    // console.log('values here', values);

    signup({ name, email, password }).then((data) => {
      console.log('errer', data.error);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={onChange('name')}
          type='name'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={onChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={onChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={onSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>
    </div>
  );

  return (
    <div className='signup'>
      <div className='signup1'>
        <h2>Signup </h2>
      </div>
      {showSuccess()}
      {showError()}

      <div className='signup2'>{signUpForm()}</div>
      {JSON.stringify(values)}
      {JSON.stringify(API)}
    </div>
  );
};

export default Signup;
