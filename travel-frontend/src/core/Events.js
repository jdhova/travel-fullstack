import React, { useEffect, useState } from 'react';
import { getEvents, getTrips } from './apiCore';

const Events = () => {
  const [tripsBySell, setTripsBySell] = useState([]);
  const [eventsByArrival, setEventsByArrival] = useState([]);
  const [error, setError] = useState(false);

  //   const loadEventsBySell = () => {
  //     getEvents('sold').then((data) => {
  //       if (data.error) {
  //         setError(data.error);
  //       } else {
  //         setEventsBySell(data);
  //       }
  //     });
  //   };

  //   const loadEventByArrival = () => {
  //     getTrips().then((data) => {
  //       if (data.error) {
  //         setError(data.error);
  //       } else {
  //         setEventsByArrival(data);
  //       }
  //     });
  //   };

  const loadEventsByArrival = () => {
    getTrips('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setEventsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadEventsByArrival();
    // loadEventsBySell();
  }, []);

  return (
    <div>
      <h3>Events here lets work</h3>
      {JSON.stringify(eventsByArrival)}
      <br></br>
      {/* {JSON.stringify(tripsBySell)} */}
    </div>
  );
};

export default Events;
