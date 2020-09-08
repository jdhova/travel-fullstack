// import React, { Fragment } from 'react';
// import Navbar from './Navbar';

// const Home = () => {
//   return (
//     <div>
//       <Navbar />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, Fragment } from 'react';
// import Layout from './Layout';
import { getTrips } from './apiCore';
// import Card from './Card';
// import Search from './Search';

const Home = () => {
  const [tripsBySell, setTripsBySell] = useState([]);
  const [tripsByArrival, setTripsByArrival] = useState([]);
  const [error, setError] = useState(false);

  // const loadTripsBySell = () => {
  //   getTrips('sold').then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setTripsBySell(data);
  //     }
  //   });
  // };

  // const loadTripsByArrival = () => {
  //   getTrips('createdAt').then((data) => {
  //     console.log(data);
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setTripsByArrival(data);
  //     }
  //   });
  // };

  //  this runs anytime the component loads for the first time
  // and there is some change in the state.

  // useEffect(() => {
  //   loadTripsByArrival();
  //   loadTripsBySell();
  // }, []);

  return (
    <Fragment>
      {/* // <Layout */}

      {/* <Search /> */}
      {/* <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
        {tripsByArrival.map((trip, i) => (
          <div key={i} className='col-4 mb-3'>
            <Card trip={trip} />
          </div>
        ))}
      </div>
      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
        {tripsBySell.map((trip, i) => (
          <div key={i} className='col-4 mb-3'>
            <Card trip={trip} />
          </div>
        ))}
      </div> */}
    </Fragment>
    // </Layout>
  );
};

export default Home;
