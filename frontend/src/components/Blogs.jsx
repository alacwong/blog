import React, {Component}from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginas: props.location.state.loginas,
            blogs_user: [],
        }

        //get users and blogs
        axios.get('http://localhost:5000/get/blogs')
            .then( res => {
                const blogs_user = res.data.sort((a, b) => a.createdAt - b.createdAt);
                this.setState({
                    blogs_user: blogs_user
                })
            });
    
    }

    render(){


        return (
            <div>
               <Nav loginas={this.state.loginas}/>

                {
                    this.state.blogs_user.map(
                        blogs_user => {
                            let [blog, user] = blogs_user
                            return (

                                <Card style={
                                    { 
                                        width: '32rem',
                                         margin: "auto", 
                                        marginBottom: 20
                                    }
                                } 
                                    key={this.state.blogs_user.indexOf(blogs_user)}>
                                    <Card.Body>
                                        <h6>{user.username}</h6>
                                        <img 
                                            src= {require("./profile/default.png")} 
                                            className="img-thumbnail" 
                                            style={{width:50, 
                                                height:50, 
                                                borderRadius: "100%",
                                                marginBottom: "4px"}}
                                        />
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>
                                            {blog.body}
                                        </Card.Text>
                                        <Link  to={
                                            {
                                                pathname: `/user/${user.username}`,
                                                state: {user:user, loginas: this.state.loginas}
                                            }
                                        }>
                                        User Profile
                                    </Link>
                                    </Card.Body>
                                </Card>
                                
                            );
                        }
                    )
                }
            </div>
        );
    }
}