/**
 * Nav bar for blogging
 */

import React, {Component}  from "react";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props){
    super(props);
        if (props.loginas){
                this.state = {
                loginas: props.loginas
            }
        } else {
            this.state = {
                loginas: props.location.state.loginas
            }
        }
    }
    render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{opacity: "85%"}}>
          <Link to=
            {
              {
                pathname: `/user/${this.state.loginas.username}`, 
                state: {user: this.state.loginas, loginas: this.state.loginas}
              }
            } 
        className="navbar-brand">Your profile</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to=
                        {
                            {
                            pathname: '/list', 
                            state: this.state
                            }
                        } 
                        className="nav-link" >User list</Link>
                    </li>
                    <li className="navbar-item">  
                        <Link to=
                        {
                            {
                            pathname: '/blogs', 
                            state: this.state
                            }
                        }              
                        className="nav-link">Recent Blogs</Link>
                    </li>
                </ul>
            </div>
        </nav>
      );
    }
  }