import React, {Component}from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Link } from 'react-router-dom';
import avatar from './profile/default.png'

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginas: props.location.state.loginas,
            users: [],

        }
        
        console.log(this.state);
        axios.get('http://localhost:5000/get')
            .then( res => {
                const users = res.data.map(user => {
                    user.profile = avatar;
                    return user;
                });
                this.setState({
                    users: users
                })
                //update user profiless

            })
    }


    update(){
        axios.get('http://localhost:5000/get')
            .then(res => {
                const users = res.data;
        
            })
    }
    render(){
        return (
            <div>
                <Nav loginas={this.state.loginas}/>
                {
                    this.state.users.map(
                        user => {
                            return  (
                            <Card style={
                                { 
                                    width: '32rem',
                                     margin: "auto", 
                                    marginBottom: 20
                                }
                            }
                            key = {this.state.users.indexOf(user)}>
                                <Card.Body>
                                     <img 
                                        src= {avatar} 
                                        className="img-thumbnail" 
                                        style={{
                                            width:50, 
                                            height:50, 
                                            borderRadius: "100%",
                                            marginBottom: "4px"
                                        }}
                                    />
                                    <Card.Title>{user.username}</Card.Title>
                                    <Link  to={
                                            {
                                                pathname: `/user/${user.username}`,
                                                state: {user: user, loginas: this.state.loginas}
                                            }
                                        }>
                                        User Profile
                                    </Link>
                                </Card.Body>
                            </Card>
                            )
                        }
                    )
                }
            </div>
        );
    }
}