/**
 * Load user details
 */

import React, {Component,  SafeAreaView, ScrollView, StyleSheet}  from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal'   
import Bio from '../components/Bio'
import axios from 'axios';

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {...this.props.location.state};
        this.state.blogData = {}

        const loading = {
            user: "loading...",
            body: "loading...",
            likes: 0,
            title: "loading",
            comments: []
        }
        console.log(this.state.blogs);
        this.state.blogs.map(blog => {
            console.log(blog, "nigga pls")
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


        const getBlog = (blog, key) =>{
            return (
                <Card style={{ width: '18rem', margin: "auto"}} key = {key}>
                    <Card.Body>
                        <Card.Title>{this.state.blogData[blog].title}</Card.Title>
                        <Card.Text>
                            {this.state.blogData[blog].body}
                        </Card.Text>
                        <Card.Link href="#">View Blog</Card.Link>
                        <Card.Link href="#">View User</Card.Link>
                    </Card.Body>
                </Card>
            );
    }   

        return (
            <div >   
                <Nav/>

                <div className="border">
                <Bio 
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    user={this.state._id}
                    handleShow={this.handleShow}
                    />
                
                {
                    this.state.blogs.map( blog => {
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
                                    <img 
                                        src= {require("./profile/default.png")} 
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