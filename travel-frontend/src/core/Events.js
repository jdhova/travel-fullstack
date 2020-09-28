import React, { useEffect, useState } from 'react';
import { getEvents, getTrips, getFilteredTrips } from './apiCore';
import Cardevent from './Cardevent';

const Events = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { event: [] },
  });

  const [tripsByArrival, setTripsByArrival] = useState([]);
  const [eventsByArrival, setEventsByArrival] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
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

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredTrips(newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        // setSize(data.size);
        // setSkip(0);
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
      <button>Search Trips</button>
    </div>
  );
};

export default Events;
