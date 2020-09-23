import React, { useEffect, useState } from 'react';
import { getEvents, getTrips } from './apiCore';
import Cardtrip from './Cardtrip';

const Trips = () => {
  const [tripsByArrival, setTripsByArrival] = useState([]);
  const [eventsByArrival, setEventsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadTripsByArrival = () => {
    getTrips('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTripsByArrival(data);
      }
    });
  };

  const loadEventsByArrival = () => {
    getEvents('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setEventsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadEventsByArrival();
    loadTripsByArrival();
  }, []);

  return (
    <div>
      <h3 className='mb-5'>Newest Trips</h3>
      <div className='row'>
        {tripsByArrival.map((trip, i) => {
          return <Cardtrip key={i} trip={trip} />;
        })}
      </div>
    </div>
  );
};

export default Trips;
