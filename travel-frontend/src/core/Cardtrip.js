import React from 'react';
import ShowImage from './ShowImage';

const Cardtrip = ({ trip }) => {
  return (
    <div className='col-4 mb-8'>
      <div className='main-card'>
        <div className='main-header'>{trip.name}</div>
        <div className='main-body'>
          <ShowImage item={trip} url='trip' />
          <p>{trip.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Cardtrip;
