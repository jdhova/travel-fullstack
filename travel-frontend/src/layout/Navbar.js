import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import { isAuthenticated } from '../auth';

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
            {isAuthenticated() && (
              <Fragment>
                <ul>
                  <li>
                    {' '}
                    <Link to='/Signin'>Signin</Link>
                  </li>

                  <li>
                    <Link to='/Signup'>Signup</Link>
                  </li>
                </ul>
              </Fragment>
            )}
          </ul>

          <ul>
            {isAuthenticated() && (
              <Fragment>
                <ul>
                  <li>
                    <Link to='/Signout'>Sigout</Link>
                  </li>
                </ul>
              </Fragment>
            )}
          </ul>

          {/* <ul>
            <li>
              <Link to='/Signout'>Sigout</Link>
            </li>
          </ul> */}
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

export default withRouter(Navbar);
