import React, { useEffect, useState } from 'react';
import { getEvents, getTrips } from './apiCore';
import Card from './Card';

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
          return <Card key={i} event={event} />;
        })}
      </div>

      {/* {JSON.stringify(eventsByArrival)}
      <br></br>
      {JSON.stringify(tripsByArrival)} */}
    </div>
  );
};

export default Events;
