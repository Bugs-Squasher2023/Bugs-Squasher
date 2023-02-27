import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const UserItem = ({user:{firstName, avatar_url, email, phoneNumber}}) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />

      <h3>{firstName}</h3>
      <h3> email: {email}</h3>
      <h3>phone: {phoneNumber}</h3>

      {/* <div>
        <Link to={`/user/${firstname}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div> */}
    </div>
  );
};


UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
