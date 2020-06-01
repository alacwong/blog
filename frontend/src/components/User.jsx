/**
 * Load user details
 */

import React, {Component}  from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from "reactjs-popup";
import Image from 'react-bootstrap';

export default class User extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>   
                <Nav/>
                 {/* <Link to="/">Login</Link> */}
                
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
                        <Popup trigger={<Button variant="primary button-style">Blog it!</Button>} position="center">
                            <div className="form-pop"></div>
                        </Popup>
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