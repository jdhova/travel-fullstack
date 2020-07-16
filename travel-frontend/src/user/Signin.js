// import React, { useState } from 'react';
// import { signin, authenticate, isAuthenticated } from '../auth';
// import { Redirect } from 'react-router-dom';
// import '../App.css';

// const Signin = () => {
//   const [values, setValues] = useState({
//     email: '',
//     password: '',
//     error: '',
//     loading: false,
//   });

//   const { email, password, loading, error, redirectToReferrer } = values;
//   const { user } = isAuthenticated();

//   const onChange = (name) => (e) => {
//     setValues({
//       ...values,
//       [name]: e.target.value,
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: false, loading: true });
//     signin({ email, password }).then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: data.error, loading: false });
//       } else {
//         authenticate(data, () => {
//           setValues({
//             ...values,
//             redirectToReferrer: true,
//           });
//         });
//       }
//     });
//   };

//   const signInForm = () => (
//     <form>
//       <div className='form-group'>
//         <label className='text-muted'>Email</label>
//         <input
//           onChange={onChange('email')}
//           type='email'
//           className='form-control'
//           value={email}
//         />
//       </div>

//       <div className='form-group'>
//         <label className='text-muted'>Password</label>
//         <input
//           onChange={onChange('password')}
//           type='password'
//           className='form-control'
//           value={password}
//         />
//       </div>
//       <button onClick={onSubmit} className='btn btn-primary'>
//         Submit
//       </button>
//     </form>
//   );

//   const showError = () => (
//     <div
//       className='alert alert-danger'
//       style={{ display: error ? '' : 'none' }}
//     >
//       {error}
//     </div>
//   );

//   const showLoading = () =>
//     loading && (
//       <div className='alert alert-info'>
//         <h2>Loading...</h2>
//       </div>
//     );

//   const redirectUser = () => {
//     if (redirectToReferrer) {
//       if (user && user.role === 1) {
//         return <Redirect to='/admin/dashboard' />;
//       } else {
//         return <Redirect to='/user/dashboard' />;
//       }
//     }
//     if (isAuthenticated()) {
//       return <Redirect to='/' />;
//     }
//   };

//   return (
//     <div className='signup'>
//       <div className='signup1'>
//         <h2>Sigin </h2>
//       </div>
//       {showLoading()}
//       {showError()}
//       {redirectUser()}

//       <div className='signup2'>{signInForm()}</div>
//       {JSON.stringify(values)}
//     </div>
//   );
// };

// export default Signin;

import React, { useState } from 'react';
import { signin } from '../auth';
import '../App.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    loading: false,
    error: '',
  });

  const { email, password, loading, error } = values;

  const onChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    signin({ email, password }).then((data) => {
      // console.log('errer', data.error);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          redirectToReferrer: false,
          loading: true,
        });
      }
    });
  };

  const signInForm = () => (
    <form>
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

  return (
    <div className='signup'>
      <div className='signup1'>
        <h2>Signup </h2>
      </div>

      {showError()}

      <div className='signup2'>{signInForm()}</div>
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
