import React, { useState, useEffect, Fragment } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
// import { createTrip, getEvents } from './apiAdmin';

const AddTrip = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    events: [],
    event: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdTrip: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    events,
    event,
    shipping,
    quantity,
    loading,
    error,
    createdTrip,
    redirectToProfile,
    formData,
  } = values;

  // useEffect loads the function when component mounts
  // and hereby getting info from the back end when events is rcieved the
  //.map at options maps tru the events and render the one thats needed.

  const init = () => {
    getEvents().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          events: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  //  runs the function when the component mounts and
  // makes it accessible and ready to use.

  const onChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createTrip(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdTrip: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className='mb-3' onSubmit={onSubmit}>
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

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={onChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={onChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={onChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Event</label>
        <select onChange={onChange('event')} className='form-control'>
          <option>Please select</option>
          {events &&
            events.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={onChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={onChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <button className='btn btn-outline-primary'>Create Trip</button>
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
      style={{ display: createdTrip ? '' : 'none' }}
    >
      <h2>{`${createdTrip}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Fragment>
      <h3>{`G'day ${user.name}, ready to add a new product?`}</h3>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Fragment>
  );
};

export default AddTrip;
