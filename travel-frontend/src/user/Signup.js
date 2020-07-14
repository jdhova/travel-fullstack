import React, { useState } from 'react';
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

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={onChange('name')}
          type='name'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={onChange('email')}
          type='email'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={onChange('password')}
          type='password'
          className='form-control'
        />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );

  return (
    <div className='signup'>
      <div className='signup1'>
        <h2>Signup </h2>
      </div>
      <div className='signup2'>{signUpForm()}</div>
    </div>
  );
};

export default Signup;
