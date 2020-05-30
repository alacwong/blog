import React, {Component}  from "react";
import LoginBox from "./SignIn"
import CreateAccount from "./CreateAccount";
import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.create = this.create.bind(this);
        this.state  = {
            username: "",
            password: "",
            render_acc: true
        }
    }

    create(){
        console.log("leo is an incel")
        this.setState(state => {
            return {render_acc: !state.render_acc}
        })
    }

    usernameChange(event){
        console.log("user");
        this.setState({
            username: event.target.value
        })
    }

    passwordChange(event){
        console.log("pass");
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event){
        const userDetails = {
            username: this.state.username,
            password: this.state.password
        }

        let userAccount;
        console.log(userDetails)
        axios.get('http://localhost:5000/auth', {
            params:{
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res =>  {
           userAccount = res.data;
           console.log(userAccount);
           console.log(res)})

        event.stopPropagation();
        event.preventDefault();
    }

    render(){
        return (
            <div >
                {
                    this.state.render_acc ? 
                    <LoginBox
                    user={this.usernameChange} 
                    pass={this.passwordChange}
                    submit={this.onSubmit}
                    create={this.create}/> :
                    <CreateAccount/>
                }


            </div>
            
        );
    }
}

