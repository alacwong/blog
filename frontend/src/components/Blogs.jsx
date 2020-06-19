import React, {Component}from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import {updateBlogs} from '../Util';

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginas: props.location.state.loginas,
            blogs: [],
            users: []
        }

        //get users and blogs
        updateBlogs(this);
    
    }

    render(){


        return (
            <div>
               <Nav loginas={this.state.loginas}/>

                {
                    this.state.blogs.map(
                        blog => {
                            let user = this.state.users.find(user => user._id === blog.user);
                            return (
                            
                                <Card style={
                                    { 
                                        width: '32rem',
                                         margin: "auto", 
                                        marginBottom: 20
                                    }
                                } 
                                    key={this.state.blogs.indexOf(blog)}>
                                    <Card.Body>
                                        <h6>{user.username}</h6>
                                        <img 
                                            src= {user.image} 
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