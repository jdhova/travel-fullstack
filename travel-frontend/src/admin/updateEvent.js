// // import React, { useState, useEffect } from 'react';
// // import Layout from '../core/Layout';
// // import { isAuthenticated } from '../auth';
// // import { Link, Redirect } from 'react-router-dom';
// // import { getCategory, updateCategory } from './apiAdmin';
// // // {category: ["5cd0258f2793ec6e100bc191"], price: []}
// // // http://localhost:3000/admin/category/update/5cd0258f2793ec6e100bc191

// // const UpdateEvent = ({ match }) => {
// //   const [values, setValues] = useState({
// //     name: '',
// //     error: '',
// //     redirectToProfile: false,
// //     formData: '',
// //     photo: '',
// //     description: '',
// //     loading: false,
// //   });

// //   // destructure user and token from localStorage
// //   const { user, token } = isAuthenticated();

// //   const { name, error, redirectToProfile } = values;

// //   //   const init = (categoryId) => {
// //   //     getCategory(categoryId, token).then((data) => {
// //   //       if (data.error) {
// //   //         setValues({ ...values, error: data.error });
// //   //       } else {
// //   //         // populate the state
// //   //         setValues({
// //   //           ...values,
// //   //           name: data.name,
// //   //         });
// //   //       }
// //   //     });
// //   //   };

// //   //   useEffect(() => {
// //   //     init(match.params.categoryId);
// //   //   }, []);

// //   //   const handleChange = (name) => (event) => {
// //   //     setValues({ ...values, error: false, [name]: event.target.value });
// //   //   };
// //   // useEffect(() => {
// //   //     init(match.params.productId);
// //   // }, []);

// //   useEffect(() => {
// //     setValues({ ...values, formData: new FormData() });
// //   }, []);

// //   const handleChange = (name) => (event) => {
// //     const value = name === 'photo' ? event.target.files[0] : event.target.value;
// //     formData.set(name, value);
// //     setValues({ ...values, [name]: value });
// //   };

// //   const submitCategoryForm = (e) => {
// //     e.preventDefault();
// //     // update with ? you should send category name otherwise what to update?
// //     const category = {
// //       name: name,
// //       name: name,
// //     };
// //     updateCategory(match.params.categoryId, user._id, token, category).then(
// //       (data) => {
// //         if (data.error) {
// //           setValues({ ...values, error: data.error });
// //         } else {
// //           setValues({
// //             ...values,
// //             name: data.name,
// //             error: false,
// //             redirectToProfile: true,
// //           });
// //         }
// //       }
// //     );
// //   };

// //   const updateCategoryForm = () => (
// //     <div className='wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55'>
// //       <form className='mb-5' onSubmit={submitCategoryForm}>
// //         <span className='login100-form-title p-b-32 m-b-7'>
// //           Update Category Form
// //         </span>
// //         <span className='txt1 p-b-11'>Category Name</span>
// //         <br />
// //         <br />
// //         <div className='wrap-input100 validate-input m-b-36'>
// //           <input
// //             onChange={handleChange('name')}
// //             value={name}
// //             className='input100'
// //             type='text'
// //             required
// //             name='name'
// //           />
// //         </div>
// //         <div className='w-size25'>
// //           <button
// //             type='submit'
// //             className='flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4'
// //           >
// //             Save Changes
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );

// //   const showError = () => (
// //     <div
// //       className={'alert alert-danger'}
// //       role='alert'
// //       style={{ display: error ? '' : 'none' }}
// //     >
// //       <button
// //         type='button'
// //         className='close'
// //         data-dismiss='alert'
// //         aria-label='Close'
// //       >
// //         <span aria-hidden='true'>&times;</span>
// //       </button>
// //       {error}
// //     </div>
// //   );

// //   const redirectUser = () => {
// //     if (redirectToProfile) {
// //       if (!error) {
// //         return <Redirect to='/admin/categories' />;
// //       }
// //     }
// //   };

// //   const goBackBTN = () => {
// //     return (
// //       <div className='mt-5'>
// //         <Link to='/admin/categories' className='text-info'>
// //           Back To Admin Home
// //         </Link>
// //       </div>
// //     );
// //   };

// //   return (
// //     <Layout
// //       title={`Hi ${user.name}`}
// //       description={`This is Update Product Action Page`}
// //       className='container-fluid'
// //     >
// //       <div className='row'>
// //         <div className='col-md-8 offset-md-2 m-b-250 mb-5'>
// //           {showError()}
// //           {updateCategoryForm()}
// //           {goBackBTN()}
// //           {redirectUser()}
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default UpdateEvent;

// import React, { useState, useEffect, Fragment } from 'react';

// import { isAuthenticated } from '../auth';
// import { Link, Redirect } from 'react-router-dom';
// import { getProduct, getCategories, updateEvent } from './apiAdmin';

// const UpdateEvent = ({ match }) => {
//   const [values, setValues] = useState({
//     name: '',
//     description: '',
//     photo: '',
//     loading: false,
//     error: false,
//     createdEvent: '',
//     redirectToProfile: false,
//     formData: '',
//   });
//   // const [categories, setCategories] = useState([]);

//   const { user, token } = isAuthenticated();
//   const {
//     name,
//     description,
//     // price,
//     // // categories,
//     // category,
//     // shipping,
//     // quantity,
//     loading,
//     error,
//     createdEvent,
//     redirectToProfile,
//     formData,
//   } = values;

//   //   const init = (productId) => {
//   //     getProduct(productId).then((data) => {
//   //       if (data.error) {
//   //         setValues({ ...values, error: data.error });
//   //       } else {
//   //         // populate the state
//   //         setValues({
//   //           ...values,
//   //           name: data.name,
//   //           description: data.description,
//   //           price: data.price,
//   //           category: data.category._id,
//   //           shipping: data.shipping,
//   //           quantity: data.quantity,
//   //           formData: new FormData(),
//   //         });
//   //         // load categories
//   //         initCategories();
//   //       }
//   //     });
//   //   };

//   // load categories and set form data

//   //   const initCategories = () => {
//   //     getCategories().then((data) => {
//   //       if (data.error) {
//   //         setValues({ ...values, error: data.error });
//   //       } else {
//   //         setCategories(data);
//   //       }
//   //     });
//   //   };

//   //   useEffect(() => {
//   //     init(match.params.productId);
//   //   }, []);

//   useEffect(() => {
//     setValues({ ...values, formData: new FormData() });
//   }, []);

//   const onChange = (name) => (event) => {
//     const value = name === 'photo' ? event.target.files[0] : event.target.value;
//     formData.set(name, value);
//     setValues({ ...values, [name]: value });
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setValues({ ...values, error: '', loading: true });

//     updateEvent(match.params.productId, user._id, token, formData).then(
//       (data) => {
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           setValues({
//             ...values,
//             name: '',
//             description: '',
//             photo: '',
//             loading: false,
//             error: false,
//             redirectToProfile: true,
//             createdEvent: data.name,
//           });
//         }
//       }
//     );
//   };

//   const newPostForm = () => (
//     <form className='mb-3' onSubmit={onSubmit}>
//       <h4>Post Photo</h4>
//       <div className='form-group'>
//         <label className='btn btn-secondary'>
//           <input
//             onChange={onChange('photo')}
//             type='file'
//             name='photo'
//             accept='image/*'
//           />
//         </label>
//       </div>

//       <div className='form-group'>
//         <label className='text-muted'>Name</label>
//         <input
//           onChange={onChange('name')}
//           type='text'
//           className='form-control'
//           value={name}
//         />
//       </div>

//       <div className='form-group'>
//         <label className='text-muted'>Description</label>
//         <textarea
//           onChange={onChange('description')}
//           className='form-control'
//           value={description}
//         />
//       </div>

//       <button className='btn btn-outline-primary'>Update Event</button>
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

//   const showSuccess = () => (
//     <div
//       className='alert alert-info'
//       style={{ display: createdEvent ? '' : 'none' }}
//     >
//       <h2>{`${createdEvent}`} is updated!</h2>
//     </div>
//   );

//   const showLoading = () =>
//     loading && (
//       <div className='alert alert-success'>
//         <h2>Loading...</h2>
//       </div>
//     );

//   const redirectUser = () => {
//     if (redirectToProfile) {
//       if (!error) {
//         return <Redirect to='/' />;
//       }
//     }
//   };

//   return (
//     <Fragment>
//       <h2>{`G'day ${user.name}, ready to add a new product?`}</h2>
//       <div className='row'>
//         <div className='col-md-8 offset-md-2'>
//           {showLoading()}
//           {showSuccess()}
//           {showError()}
//           {newPostForm()}
//           {redirectUser()}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateEvent;
