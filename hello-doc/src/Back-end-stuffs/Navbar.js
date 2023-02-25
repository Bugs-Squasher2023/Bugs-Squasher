import PropTypes from 'prop-types';
import React from 'prop-types';
// import {Link} from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>{title}</h1>

      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/about'>about</a>
        </li>
      </ul>

    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Portal',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
