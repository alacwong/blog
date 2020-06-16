/**
 * Load user details
 */

import React, {Component}  from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import Bio from '../components/Bio'
import avatar from './profile/default.png'
import {updateUserBlogs, updateProfile} from '../Util'

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {...props.location.state};    //user page
        this.state.blogs = []

        updateUserBlogs(this);
        if (this.state.user.profile.length > 100){
            this.state.image = this.state.user.profile;
        } else {
            this.state.image = avatar; 
            updateProfile(this);
        }
    }


    render(){
          
        return (
            
            <div >   
                <Nav loginas={this.state.loginas}/>
                <div className="border">
                    <Bio 
                        user={this.state.user}
                        show={this.state.user._id === this.state.loginas._id}
                        component={this}
                        image={this.state.image}
                    />
                    {
                        this.state.blogs.map( blog => {
                            console.log(blog)
                            return (
                                <Card style={
                                    { 
                                        width: '32rem',
                                        margin: "auto", 
                                        marginBottom: 20
                                    }
                                } 
                                    key={this.state.user.blogs.indexOf(blog)}>
                                    <Card.Body>
                                        <img
                                            src= {this.state.image}
                                            className="img-thumbnail" 
                                            style=
                                                {{
                                                    width:50, 
                                                    height:50, 
                                                    borderRadius: "100%",
                                                    marginBottom: "4px"
                                                }}
                                        />
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>
                                            {blog.body}
                                        </Card.Text>
                                        <Card.Link href="#">View User</Card.Link>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}