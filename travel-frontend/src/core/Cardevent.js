// import React, { useState } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import ShowImage from './ShowImage';
// import moment from 'moment';
// import { addItem, updateItem, removeItem } from './cartHelpers';

// import React from 'react';
// import ShowImage from './ShowImage';

// const eventCard = ({ event }) => {
//   return (
//     <div className='col-4 mb-8'>
//       <div className='main-card'>
//         <div className='main-header'>{event.name}</div>
//         <div className='main-body'>
//           <ShowImage item={event} url='event' />
//           <p>{event.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default eventCard;

import React from 'react';
import ShowImage from './ShowImage';
import { getFilteredTrips } from './apiCore';

const Cardevent = ({ event }) => {
  // const onclick = (e) => {};

  return (
    <div className='col-4 mb-8'>
      <div className='main-card'>
        <div className='main-header'>{event.name}</div>
        <div className='main-body'>
          <ShowImage item={event} url='event' />
          <p>{event.description}</p>
          {/* <button>Search Trips</button> */}
          <button
            type='submit'
            onClick={function () {
              getFilteredTrips();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cardevent;

// const Card = ({
//   trip,
//   //   showViewProductButton = true,
//   //   showAddToCartButton = true,
//   //   cartUpdate = false,
//   //   showRemoveProductButton = false,
//   //   setRun = (f) => f,
//   //   run = undefined,
//   // changeCartSize
// }) => {
//   //   const [redirect, setRedirect] = useState(false);
//   //   const [count, setCount] = useState(product.count);

//   //   const showViewButton = (showViewProductButton) => {
//   //     return (
//   //       showViewProductButton && (
//   //         <Link to={`/product/${product._id}`} className='mr-2'>
//   //           <button className='btn btn-outline-primary mt-2 mb-2 card-btn-1'>
//   //             View Product
//   //           </button>
//   //         </Link>
//   //       )
//   //     );
//   //   };

//   //   const addToCart = () => {
//   //     // console.log('added');
//   //     addItem(product, setRedirect(true));
//   //   };

//   //   const shouldRedirect = (redirect) => {
//   //     if (redirect) {
//   //       return <Redirect to='/cart' />;
//   //     }
//   //   };

//   //   const showAddToCartBtn = (showAddToCartButton) => {
//   //     return (
//   //       showAddToCartButton && (
//   //         <button
//   //           onClick={addToCart}
//   //           className='btn btn-outline-warning mt-2 mb-2 card-btn-1  '
//   //         >
//   //           Add to cart
//   //         </button>
//   //       )
//   //     );
//   //   };

//   //   const showStock = (quantity) => {
//   //     return quantity > 0 ? (
//   //       <span className='badge badge-primary badge-pill'>In Stock </span>
//   //     ) : (
//   //       <span className='badge badge-primary badge-pill'>Out of Stock </span>
//   //     );
//   //   };

//   //   const handleChange = (productId) => (event) => {
//   //     setRun(!run); // run useEffect in parent Cart
//   //     setCount(event.target.value < 1 ? 1 : event.target.value);
//   //     if (event.target.value >= 1) {
//   //       updateItem(productId, event.target.value);
//   //     }
//   //   };

//   //   const showCartUpdateOptions = (cartUpdate) => {
//   //     return (
//   //       cartUpdate && (
//   //         <div>
//   //           <div className='input-group mb-3'>
//   //             <div className='input-group-prepend'>
//   //               <span className='input-group-text'>Adjust Quantity</span>
//   //             </div>
//   //             <input
//   //               type='number'
//   //               className='form-control'
//   //               value={count}
//   //               onChange={handleChange(product._id)}
//   //             />
//   //           </div>
//   //         </div>
//   //       )
//   //     );
//   //   };

//   //   const showRemoveButton = (showRemoveProductButton) => {
//   //     return (
//   //       showRemoveProductButton && (
//   //         <button
//   //           onClick={() => {
//   //             removeItem(product._id);
//   //             setRun(!run); // run useEffect in parent Cart
//   //           }}
//   //           className='btn btn-outline-danger mt-2 mb-2'
//   //         >
//   //           Remove Product
//   //         </button>
//   //       )
//   //     );
//   //   };

//   return (
//     // <div className='col-10 mb-8'>
//     <div className='card '>
//       <div className='card-header card-header-1 '>{trip.name}</div>
//       <div className='card-body'>
//         {/* {shouldRedirect(redirect)} */}
//         <ShowImage item={trip} url='trip' />
//         <p className='card-p  mt-2'>{trip.description} </p>
//         <p className='card-p  mt-2'>{trip.description.substring(0, 100)} </p>
//         {/* <p className='card-p black-15'>$ {trip.photo}</p> */}
//         <p className='card-p black-10'>$ {trip.price}</p>
//         {/* <p className='black-9'>Event: {trip.event && trip.event.name}</p> */}

//         {/* <p className='black-8'>Added on {moment(trip.createdAt).fromNow()}</p>
//         {showStock(trip.quantity)}
//         <br /> */}

//         {/*
//         {showViewButton(showViewTripButton)}

//         {showAddToCartBtn(showAddToCartButton)}

//         {showRemoveButton(showRemoveTripButton)}

//         {showCartUpdateOptions(cartUpdate)} */}
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default Card;

//// NEW LINE HERE

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Card = ({ trip }) => {
//   return (
//     <div className='col-4 mb-3'>
//       <div className='card'>
//         <div className='card-header'>{trip.name}</div>
//         <div className='card-body'>
//           <p>{trip.description}</p>
//           <p>{trip.price}</p>
//           <Link to='/'>
//             <button className='btn btn-outline-primary mt-2 mb-2'>
//               View Product
//             </button>
//             <button className='btn btn-outline-warning mt-2 mb-2'>
//               Add to cart
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
