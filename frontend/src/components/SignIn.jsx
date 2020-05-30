import React, {Component}  from "react";

export default class LoginBox extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <form   className="form-group mid-container"onSubmit={this.props.submit}>
            <label>Username</label>
            <input 
                type="text" 
                className="form-control" 
                onChange={this.props.user}>
                </input>
            <label>Password</label>
            
             <input 
                type="text" 
                className="form-control password" 
                onChange={this.props.pass}>
                </input>
            
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

