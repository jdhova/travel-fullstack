import React, { useState } from 'react';
import { signup } from '../auth';
import '../App.css';

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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, error }).then((data) => {
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

  return (
    <div className='signup'>
      <div className='signup1'>
        <h2>Signup </h2>
      </div>
      <div className='signup2'>{signUpForm()}</div>
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
