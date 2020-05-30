import React, {Component}  from "react";

export default class LoginBox extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <form  className="form-group mid-container" onSubmit={this.props.submit}>
            <label>Username</label>
            <input 
                type="text" 
                className="form-control"/>

            <label>Password</label>
             <input 
                type="text" 
                className="form-control password"/>
			 <label>Re-enter your password</label>
            <input 
                type="text" 
                className="form-control"/> 
            <label>First Name</label>
             <input 
                type="text" 
                className="form-control password"/>
				<label>Last Name</label>
             <input 
                type="text" 
                className="form-control password"/>
            
            <div>
            <input 
                type="submit" 
                value="Sign in" 
                className="btn btn-primary button-style" 
                 />
            </div>
            
            <button 
                className="btn btn-primary button-style" 
                onClick={this.props.create}> 
                Create Account</button>
            </form> 
        )
    }
}

