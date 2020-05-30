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

            render_acc: true
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
           userAccount = res.data;
           console.log(userAccount);
           console.log(res)})

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Method for account creation
     * @param {} event 
     */
    createAccount(event){
        event.stopPropagation();
        event.preventDefault();

        console.log(this.state.user)
        // axios.post('http://localhost:5000/add', this.state.user)
        //     .then(res =>console.log(res));
    }


    /**
     * Following methods for updating account creaiton details
     * @param {} event 
     */
    createUserChange(event){
        console.log(this === undefined)
        const newuser = {...this.state.user}
        newuser.username = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createPassChange(event){
        const newuser = {...this.state.user}
        newuser.pass = event.target.value;
        this.setState({
            user: newuser
        });
    }

    createPass2Change(event){
        const newuser = {...this.state.user}
        newuser.pass2 = event.target.value;
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
                    <LoginBox
                    user={this.usernameChange} 
                    pass={this.passwordChange}
                    submit={this.onSubmit}
                    create={this.create}
                    /> :
                    <CreateAccount
                    user={this.createUserChange}
                    pass={this.createPassChange}
                    pass2={this.createPass2Change}
                    firstname={this.createFirstChange}
                    lastname={this.createLastnameChange}
                    submit={this.createAccount}
                    />
                }
            </div>
            
        );
    }
}

