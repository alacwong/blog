/**
 * Load user details
 */

import React, {Component, useState}  from "react";
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
        this.getBlog = this.getBlog.bind(this);

        const loading = {
            user: "loading...",
            body: "loading...",
            likes: 0,
            title: "loading",
            comments: []
        }

        this.state.blogs.map(blog => {

            //to prevent crashes
            this.state.blogData[blog] = loading;
            axios.get('http://localhost:5000/get/blog', {"_id": blog})
                .then(res => {
                    const newBlog = {...this.state.blogData}
                    newBlog[res.data._id] = res.data;
                    this.setState({
                        blogData: newBlog
                    })
                })
        }

        )
    }

    getBlog(blog){
            return (
                <Card style={{ width: '18rem', margin: "auto"}}>
                    <Card.Body>
                        <Card.Title>{this.state.blogData[blog].title}</Card.Title>
                        <Card.Text>
                            {this.state.blogData[blog].body}
                        </Card.Text>
                        <Card.Link href="#">View Blog</Card.Link>
                        <Card.Link href="#">View User</Card.Link>
                    </Card.Body>
                </Card>
                )
            
    }   


    render(){

          


        return (
            <div>   
                <Nav/>
                 {/* <Link to="/">Login</Link> */}

                <Bio 
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    handleShow={this.handleShow}
                />
                

                {
                    this.state.blogs.map( this.getBlog)
                }

            </div>
            
        )
    }
}