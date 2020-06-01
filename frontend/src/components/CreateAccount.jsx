import React, {Component}  from "react";

export default class LoginBox extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <form  className="form-group mid-container" onSubmit={this.props.submit} >
            <label>Username</label>
            <input 
                type="text" 
                className="form-control"
                onChange={this.props.user}
                />

            <label>Password</label>
            <input 
                type="text" 
                className="form-control password"
                onChange={this.props.pass}
                />

			<label>Re-enter your password</label>
            <input 
                type="text" 
                className="form-control password"
                onChange={this.props.pass2}
            />

            <label>First Name</label>
            <input 
                type="text" 
                className="form-control"
                onChange={this.props.firstname}
                />

			<label>Last Name</label>
            <input 
                type="text" 
                className="form-control"
                onChange={this.props.lastname}
                />
            
            <div>
                <input 
                    type="submit" 
                    value="Create Account" 
                    className="btn btn-primary button-style" 
                 />
            </div>
            
            </form> 
        )
    }
}

