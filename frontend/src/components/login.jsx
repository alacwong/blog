import React, {Component}from "react";
import LoginBox from "./SignIn"
import CreateAccount from "./CreateAccount";
import axios from 'axios';
import avatar from './profile/default.png'

export default class Login extends Component{
    constructor(props){
        super(props);
        
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.create = this.create.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.createFirstChange = this.createFirstChange.bind(this);
        this.createLastnameChange = this.createLastnameChange.bind(this);
        this.createPass2Change = this.createPass2Change.bind(this);
        this.createPassChange = this.createPassChange.bind(this);
        this.createUserChange = this.createUserChange.bind(this);
        this.state  = {

            userAuth: {
                username: "",
                password: "" 
            },
            
            user: {
                username: "",
                password: "",
                password2: "",
                firstname: "",
                lastname: "",
            },
            
            render_acc: true,
            render_dialog: false,
            render_dialog2: false
        }
    }

    /**
     * State to render create account or login
     */
    create(){
        this.setState(state => {
            return {render_acc: !state.render_acc}
        })
    }

    /**
     * Follow methods for updating login details
     * @param {*} event 
     */

     
    usernameChange(event){
        const newUserAuth = {...this.state.userAuth};
        newUserAuth.username = event.target.value;
        this.setState({
            userAuth: newUserAuth
        })
    }

    passwordChange(event){
        const newUserAuth = {...this.state.userAuth};
        newUserAuth.password = event.target.value;
        this.setState({
            userAuth: newUserAuth
        })
    }

    /**
     * Authenticate User
     * @param {} event 
     */
    onSubmit(event){

        let userAccount;
        axios.get('http://localhost:5000/auth', {
            params: this.state.userAuth
        })
        .then(res =>  {
           userAccount = {...res.data, image: avatar};
           this.props.history.push( {
               pathname: "/user/" + res.data.username,
               state: {user: userAccount, loginas: userAccount}
           });
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            this.setState({
                render_dialog2: true
            });
        })
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Method for account creation
     * @param {} event 
     */
    createAccount(event){

        //verify passswords are the same
        if (this.state.user.password === this.state.user.password2){
            const user = this.state.user
            delete user.password2
            axios.post('http://localhost:5000/add', user)
                .then(res =>{
                    let userAccount = {...res.data, image: avatar}
                    this.props.history.push( {
                        pathname: "/user/" + res.data.username,
                        state: {user: userAccount, loginas: userAccount}
                    });
                })
                .catch(err => {
                    console.log(err);
                })

        } else{
            this.setState({
                render_dialog: true
            });
        }

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Following methods for updating account creaiton details
     * @param {} event 
     */
    createUserChange(event){
        const newuser = {...this.state.user}
        newuser.username = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createPassChange(event){
        const newuser = {...this.state.user}
        newuser.password = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createPass2Change(event){
        const newuser = {...this.state.user}
        newuser.password2 = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createFirstChange(event){
        const newuser = {...this.state.user}
        newuser.firstname = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createLastnameChange(event){
        const newuser = {...this.state.user}
        newuser.lastname = event.target.value;
        this.setState({
            user: newuser
        });
    }

    render(){
        return (
            <div >
                {   
                    this.state.render_acc ? 
                    <div>
                        <LoginBox
                            user={this.usernameChange} 
                            pass={this.passwordChange}
                            submit={this.onSubmit}
                            create={this.create}
                        />
                        {
                            this.state.render_dialog2 &&
                            <p style=
                                {{
                                    color: "red", 
                                    textAlign: 'center'
                                }}>
                            * Password Username combination does not exist
                            </p>
                        }                         
                    </div>
                    :
                    <div>
                        <CreateAccount
                            user={this.createUserChange}
                            pass={this.createPassChange}
                            pass2={this.createPass2Change}
                            firstname={this.createFirstChange}
                            lastname={this.createLastnameChange}
                            submit={this.createAccount}
                            url={this.state.url}
                        />
                        {
                            this.state.render_dialog && 
                            <p style=
                                {{
                                    color: "red",
                                    textAlign: 'center'
                                }}>
                                * Passwords are not matching
                            </p>
                        }
                    </div>
                }
            </div>
        );
    }
}

