/**
 * Load user details
 */

import React, {Component}  from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import Bio from '../components/Bio'
import axios from 'axios';

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {...this.props.location.state};    //user page
        this.state.blogData = {}
        console.log(this.state);

        const loading = {
            user: "loading...",
            body: "loading...",
            likes: 0,
            title: "loading",
            comments: []
        }
        console.log(this.state.user.blogs);
        this.state.user.blogs.map(blog => {
            //to prevent crashes
            this.state.blogData[blog] = loading;
            axios.get('http://localhost:5000/get/blog', {
                params: {id: blog}
            })
                .then(res => {
                    const newBlog = {...this.state.blogData}
                    console.log(res.data);
                    newBlog[res.data._id] = res.data;
                    this.setState({
                        blogData: newBlog
                    });
                }
            )
        })
    }

    render(){  

        return (
            <div >   
                <Nav loginas={this.state.loginas}/>
                <div className="border">
                <Bio 
                    firstname={this.state.user.firstname}
                    lastname={this.state.user.lastname}
                    user={this.state.user._id}
                    handleShow={this.handleShow}
                    show={this.state.user._id === this.state.loginas._id}
                />
                {
                    this.state.user.blogs.map( blog => {
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
                                        src= {require(`./profile/${this.state.user.profile}`)}
                                        className="img-thumbnail" 
                                        style={{width:50, 
                                            height:50, 
                                            borderRadius: "100%",
                                            marginBottom: "4px"}}
                                    />
                                    <Card.Title>{this.state.blogData[blog].title}</Card.Title>
                                    <Card.Text>
                                        {this.state.blogData[blog].body}
                                    </Card.Text>
                                    <Card.Link href="#">View Blog</Card.Link>
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