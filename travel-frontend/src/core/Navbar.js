import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import { signout, isAuthenticated } from '../auth';

const Navbar = ({ history }) => {
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
            {!isAuthenticated() && (
              <Fragment>
                <li>
                  {' '}
                  <Link to='/Signin'>Signin</Link>
                </li>

                <li>
                  <Link to='/Signup'>Signup</Link>
                </li>
              </Fragment>
            )}
          </ul>

          <ul>
            {isAuthenticated() && (
              <Fragment>
                <ul>
                  <li
                    onClick={() =>
                      signout(() => {
                        history.push('/');
                      })
                    }
                  >
                    <Link to='/Signout'>Sigout</Link>
                  </li>
                </ul>
              </Fragment>
            )}
          </ul>
          <ul>
            <li>
              <Link to='/Events'>Events</Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Navbar);
