/**
 * Load user details
 */

import React, {Component}  from "react";
import Nav from '../components/nav'
import Card from 'react-bootstrap/Card'
import Bio from '../components/Bio'
import axios from 'axios';
import avatar from './profile/default.png'

export default class User extends Component {
    constructor(props){
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.updateBlogs = this.updateBlogs.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.state = {...props.location.state};    //user page
        this.state.blogData = {}  
        this.state.image = avatar;      
        this.updateBlogs();
        this.updateImage();
    }



    updateUser(user){

    }

    updateImage(){
        axios.get('http://localhost:5000/get/profile', {
            params: {_id: this.state.user.profile}
    })
            .then(res => {
                console.log(res);
                const [file, chunks] = [res.data.file, res.data.chunks];
                chunks.sort((a,b) => a.n - b.n);
                let imageData = chunks.reduce((acc, cur) => {
                   return acc + cur.data;
                }, '');
                const src = `data:${file.contentType};base64,${imageData}`;
                this.setState({
                    image: src
                })
            })
    }

    updateBlogs(){
        const loading = {
            user: "loading...",
            body: "loading...",
            likes: 0,
            title: "loading",
            comments: []
        }

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
                        user={this.state.user}
                        show={this.state.user._id === this.state.loginas._id}
                        updateUser={this.updateUser}
                        updateImage={this.updateImage}
                        updateBlog={this.updateBlogs}
                        image={this.state.image}
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
                                        <Card.Title>{this.state.blogData[blog].title}</Card.Title>
                                        <Card.Text>
                                            {this.state.blogData[blog].body}
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