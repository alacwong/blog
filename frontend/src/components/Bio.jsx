import React, {Component, useState}  from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Bio extends Component{
    constructor(props){
        super(props)
        this.uploadFile = this.uploadFile.bind(this);
        this.browseFile = this.browseFile.bind(this);
        this.state = {
            file: null,
        }
    }

    uploadFile(event){

        event.stopPropagation();
        event.preventDefault();
        let fd = new FormData();
        fd.append("image", this.state.file);
        fd.append('user', this.props.user._id);
        console.log(event);
        
        axios.post('http://localhost:5000/save/profile', fd, {headers:{'Content-Type': 'multipart/form-data'}})
            .then(res => {
               console.log(res);
            }).catch( err => {
            console.log(err);
            });

        
    }

    browseFile(e){
      this.setState({
        file: e.target.files[0]
      });
      console.log(e.target.files);
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
                    user: props.user._id,
                    body: body,
                    title: title,
                }

                console.log(blog);
                
                axios.post('http://localhost:5000/blogger/blog', blog)
                    .then(res =>{
                        res.json('success');
                        //reload user
                        axios.post('http://localhost:5000/get/user', {id: props.user})
                            .then(user => this.props.updateUser(user));
                    })
                    .catch(err => console.log(err));
                    setShow(false);
                    setBody("");
                    setTitle("");
                }
          
            return (
              <>
                <Button variant="primary button-style" onClick={handleShow}>Blog it!</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new Blog</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={submit}>Upload</Button>
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
                <Card.Title>{this.props.user.firstname + " " + this.props.user.lastname}</Card.Title>
                <Card.Text>Welcome to my blog page!</Card.Text>
                <div>
                    <img 
                         src= {this.props.image}
                        className="img-thumbnail" 
                        style={{width:100, height:100, borderRadius: "100%"}}
                    />
                </div>
                {
                    this.props.show &&
                    <div className="flex">
                        <input type="file" 
                            className="upload"
                            onChange={this.browseFile}>
                        </input>
                        <Button variant="primary" onClick={this.uploadFile}>Upload</Button>
                    </div>
                }
            </Card.Body>
            {
                this.props.show &&
                <div>
                    <Example user={this.props.user}/>
                </div>              
            }
            </Card>
        )
    }
}