import './App.css';
import React, { Component, Fragment } from 'react';
import Search from './Back-end-stuffs/Search';
import About from './Back-end-stuffs/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Navbar from './Back-end-stuffs/Navbar';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    //make it go away after 5 sec
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <div className='App'>
        <div className='container'>
        <Navbar />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <h1>This is the Home Page!</h1>
        </div>
      </div>
    );
  }
}

export default App;
