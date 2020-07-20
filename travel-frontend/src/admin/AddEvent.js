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
    loading: false,
    error: false,
    formData: '',
    createdEvent: '',
  });

  const {
    name,
    photo,
    description,
    loading,
    error,
    formData,
    createdEvent,
  } = values;

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

  // const onChange = (name) => (e) => {
  //   setValues({ ...values, error: false, [name]: e.target.value });
  // };

  const onChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value, error: false });
  };

  // const onChange = (name) => (event) => {
  //   const value = name === 'photo' ? event.target.files[0] : event.target.value;
  //   formData.set(name, value);
  //   setValues({ ...values, [name]: value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setValues('');
  //   setValues(false);
  //   // make request to api to create Event
  //   createEvent(user._id, token, { name }).then((data) => {
  //     if (data.error) {
  //       setValues(data.error);
  //     } else {
  //       setValues('');
  //       setValues(true);
  //     }
  //   });
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createEvent(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          createdEvent: data.name,
        });
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

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdEvent ? '' : 'none' }}
    >
      <h2>{`${createdEvent}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  const showError = () => {
    if (error) {
      console.table(error);
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
          {showLoading()}
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
