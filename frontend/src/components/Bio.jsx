import React, {Component, useState}  from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default class Bio extends Component{
    constructor(props){
        super(props)
    }

    render(){

        function Example() {
            const [show, setShow] = useState(false);
          
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
          
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
                  <div className="form-group">
                                <label>Enter Blog title</label>
                                <input type='text' className="form-control"></input>
                                <input type='text' className="form-control"></input>                                
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
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
                    marginTop: "2%"
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
                    style={{width:100, height:100}}
                />
                </div>
            </Card.Body>
            <div>
                <Example/>
            </div>
            </Card>
        )
        
    }
}





