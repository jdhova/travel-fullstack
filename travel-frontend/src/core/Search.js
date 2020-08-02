import React, { useState, useEffect } from 'react';
import { getEvents, list } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    events: [],
    event: '',
    search: '',
    results: [],
    searched: false,
  });

  const { events, event, search, results, searched } = data;

  const loadEvents = () => {
    getEvents().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, events: data });
      }
    });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, event: event }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} trips`;
    }
    if (searched && results.length < 1) {
      return `No Trips found`;
    }
  };

  const searchedTrips = (results = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>

        <div className='row'>
          {results.map((trip, i) => (
            <div className='col-4 mb-3'>
              <Card key={i} trip={trip} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn mr-2' onChange={handleChange('event')}>
              <option value='All'>All</option>
              {events.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type='search'
            className='form-control'
            onChange={handleChange('search')}
            placeholder='Search by name'
          />
        </div>
        <div className='btn input-group-append' style={{ border: 'none' }}>
          <button className='input-group-text'>Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedTrips(results)}</div>
    </div>
  );
};

export default Search;
