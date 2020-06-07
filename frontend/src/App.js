import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/login"
import User from "./components/User"
import "bootstrap/dist/css/bootstrap.min.css"
import history from './history';
import List from './components/List';
import Blogs from './components/Blogs';
import { BrowserRouter  as Router, Route} from 'react-router-dom'
function App() {
  return (
    
    <Router>
        <Route path="/" exact component={Login} history={history}/>
        <Route path="/user/:id" component={User}/>
        <Route path="/list" component={List}/>
        <Route path="/blogs" component={Blogs}/>
    </Router>
  )
}

export default  App;
