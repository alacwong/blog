import React, {Component}from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginas: props.location.state,
            users: []
        }
        //get users
        axios.get('http://localhost:5000/get')
            .then( res => {
                const users = res.data;
                this.setState({
                    users: users
                })
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
                                        src= {require("./profile/default.png")} 
                                        className="img-thumbnail" 
                                        style={{width:50, 
                                        height:50, 
                                        borderRadius: "100%",
                                        marginBottom: "4px"}}
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