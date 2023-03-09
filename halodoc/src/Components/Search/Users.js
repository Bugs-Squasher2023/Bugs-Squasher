import React from 'react';
import UserItem from './UserItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <div>
            <UserItem key={user.id} user={user} />
          </div>
          
        ))}
      </div>
    );
  }
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
  margin: '30px 30px 30px 30px',
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '0.7rem'
};

export default Users;
