/**
 * Nav bar for blogging
 */

import React, {Component}  from "react";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props){
      super(props);

      this.state  = {
        state: props.user
      }
    }


    render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{opacity: "85%"}}>
          <Link to="/user" className="navbar-brand">Your profile</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to={{pathname: '/list', state: {nWord: "nigger"}}} className="nav-link" >User list</Link>
            </li>
            <li className="navbar-item">  
            <Link to="/Home" className="nav-link">Recent Blogs</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
  }