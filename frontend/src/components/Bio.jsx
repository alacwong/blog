import React, {Component, useState}  from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios';

export default class Bio extends Component{
    constructor(props){
        super(props)
    }

    render(){

        function Example(props) {
            const [show, setShow] = useState(false);
            const [title, setTitle] = useState("");
            const [body, setBody] = useState("");
          
            const handleClose = () => {
              setShow(false);
              console.log(title, body)
            }
            const handleShow = () => setShow(true);
            const handleTitle = (e) => setTitle(e.target.value);
            const handleBody = (e) => setBody(e.target.value);
            const submit = () => {
              const blog = {
                user: props.user,
                body: body,
                title: title,
              }

              console.log(blog);
              
              axios.post('http://localhost:5000/blogger/blog', blog)
                .then(() => console.log("Blog added successfully"))
                .catch((res) => console.log(res));
                setShow(false);
                setBody("");
                setTitle("");
            }
          
            return (
              <>
                <Button variant="primary button-style" onClick={handleShow}>
                  Blog it!
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control
                           type="text" placeholder="Title"
                            value = {title} onChange={handleTitle}/>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control 
                          as="textarea" rows="10" 
                          value={body} onChange={handleBody}/>
                        </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={submit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          }

        return (
            <Card style= {
                {
                    width: '27rem', 
                    margin: "auto", 
                    marginBottom: "5%",
                    marginTop: "5%",
                    textAlign: "center"
                }
            }>
            <Card.Body>
                <Card.Title>{
                    this.props.firstname
                    + " " + 
                    this.props.lastname} 
                </Card.Title>
                <Card.Text>
                    Welcome to my blog page!
                </Card.Text>
                <div>
                <img 
                    src= {require("./profile/default.png")} 
                    className="img-thumbnail" 
                    style={{width:100, height:100, borderRadius: "100%"}}
                />
                </div>
            </Card.Body>
            <div>
                <Example user={this.props.user}/>
            </div>
            </Card>
        )
        
    }
}





