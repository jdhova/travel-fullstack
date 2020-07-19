import React, { useState, Fragment } from 'react';
// import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createEvent } from './apiAdmin';

const AddEvent = () => {
  const [values, setValues] = useState({
    name: '',
    photo: '',
    description: '',
    success: false,
    error: false,
  });

  const { name, photo, description, success, error } = values;

  // const [name, setName] = useState('');
  // const [photo, setPhoto] = useState('');
  // const [description, setdescription] = useState('');
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  // const onChange = (e) => {
  //   setError('');
  //   setName(e.target.value);
  //   setdescription(e.target.value);
  // };

  const onChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues('');
    setValues(false);
    // make request to api to create Event
    createEvent(user._id, token, { name }).then((data) => {
      if (data.error) {
        setValues(data.error);
      } else {
        setValues('');
        setValues(true);
      }
    });
  };

  const newEventForm = () => (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='name'
          className='form-control'
          onChange={onChange('name')}
          value={name}
          autoFocus
          required
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <input
          type='description'
          className='form-control'
          onChange={onChange('description')}
          value={description}
          autoFocus
          required
        />
      </div>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={onChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <button className='btn btn-outline-primary'>Create Event</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>Event should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    // <Layout
    //   title='Add a new event'

    // >
    <Fragment>
      <h3>{`G'day ${user.name}, ready to add a new event?`}</h3>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newEventForm()}
          {goBack()}
        </div>
      </div>

      {JSON.stringify(values)}
      {/* // </Layout> */}
    </Fragment>
  );
};

export default AddEvent;
