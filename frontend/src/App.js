import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/login"
import User from "./components/User"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter  as Router, Route} from 'react-router-dom'
function App() {
  return (
    
    <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/user/:id" component={User}/>
    </Router>
  )
}

export default  App;
