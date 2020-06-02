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

export default class User extends Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        console.log("nigger");
        console.log(this.props.location.state);
        this.state = {...this.props.location.state}
        this.state.show = false;
        
        
    }


    handleClose(){
        this.setState({
            show:false
        })
    }

    handleShow(){
       this.setState({
           show:true
       })
    }



    render(){


        return (
            <div>   
                <Nav/>
                 {/* <Link to="/">Login</Link> */}

                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Creating a new Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label>Enter Blog title</label>
                                <input type='text' className="form-control"></input>
                                <input type='text' className="form-control"></input>                                
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Blog it!
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
                 <Card style={
                     {
                        width: '27rem', 
                        margin: "auto", 
                        marginBottom: "5%",
                        marginTop: "2%"
                    }
                }>
                    <Card.Body>
                        <Card.Title>Alac wong</Card.Title>
                        <Card.Text>
                            Welcome to my blog page!
                        </Card.Text>
                        <div>
                        <img 
                            src= {require("./profile/default.png")} 
                            className="img-thumbnail" 
                            style={{width:100, height:100}}
                        />
                        </div>
                
                    </Card.Body>
                    <div>
                        <Button variant="primary button-style" onClick={this.handleShow}>Blog it!</Button>
                    </div>
                </Card>


                 <Card style={{ width: '18rem', margin: "auto"}}>
                    <Card.Body>
                        <Card.Title>Blog title</Card.Title>
                        <Card.Text>
                            Hello world
                        </Card.Text>
                        <Card.Link href="#">View Blog</Card.Link>
                        <Card.Link href="#">View User</Card.Link>
                    </Card.Body>
                </Card>

            </div>
            
        )
    }
}