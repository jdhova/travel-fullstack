import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <Fragment>
      <div className='main-nav'>
        <div className='home-nav'>
          <ul>
            <li>
              <Link to='/Home'>Home</Link>
            </li>
          </ul>
        </div>

        <div className='othernav'>
          <ul>
            <li>
              {' '}
              <Link to='/Signin'>Signin</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to='/Signup'>Signup</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to='/Event'>Events</Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
