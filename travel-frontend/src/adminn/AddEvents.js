import React, { Fragment, useState } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AddEvenets = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const newEventsForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='name'
          className='form-control'
          // onChange={onChange('name')}
          value={name}
          autoFocus
          required
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          type='description'
          className='form-control'
          // onChange={onChange('description')}
          // value={description}
          autoFocus
          required
        />
      </div>

      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            // onChange={onChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <button className='btn btn-outline-primary'>Create Event</button>
    </form>
  );

  // const showSuccess = () => (
  //   <div
  //     className='alert alert-info'
  //     style={{ display: createdEvent ? '' : 'none' }}
  //   >
  //     <h2>{`${createdEvent}`} is created!</h2>
  //   </div>
  // );

  // const showLoading = () =>
  //   loading && (
  //     <div className='alert alert-success'>
  //       <h2>Loading...</h2>
  //     </div>
  //   );

  // const showError = () => {
  //   if (error) {
  //     return <h3 className='text-danger'>Event should be unique</h3>;
  //   }
  // };

  // const goBack = () => (
  //   <div className='mt-5'>
  //     <Link to='/admin/dashboard' className='text-warning'>
  //       Back to Dashboard
  //     </Link>
  //   </div>
  // );

  return (
    <Fragment>
      <h3>{`G'day ${user.name}, ready to add a new event?`}</h3>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {newEventsForm()}

          {/* {showSuccess()}
          {showLoading()}
          {showError()}
          {newEventForm()}
          {goBack()} */}
        </div>
      </div>

      {/* {JSON.stringify(values)} */}
    </Fragment>
  );
};

export default AddEvenets;
