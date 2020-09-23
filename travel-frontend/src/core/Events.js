import React, { useEffect, useState } from 'react';
import { getEvents, getTrips } from './apiCore';
import Cardevent from './Cardevent';

const Events = () => {
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
      <h3 className='mb-5'>Newest Events</h3>
      <div className='row'>
        {eventsByArrival.map((event, i) => {
          return <Cardevent key={i} event={event} />;
        })}
      </div>
    </div>
  );
};

export default Events;
