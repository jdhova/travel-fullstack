import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
  <div className='event-img'>
    <img
      // src={`${API}/${url}/photo/${item._id}`}

      src={`${API}/events/photo/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={{ maxHeight: '0%', maxWidth: '0%' }}
    />
  </div>
);

export default ShowImage;
