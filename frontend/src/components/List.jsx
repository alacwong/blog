import React, {Component}from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import {updateUsers} from '../Util'


export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginas: props.location.state.loginas,
            users: [],
        }
        updateUsers(this);
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
                                        src= {user.image} 
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