import React from 'react';
import '../LoginRegister/main.css';



const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);


interface LoginProps {
    email?: string;
    password?: string;
}

interface LoginState {
    email : string,
    password: string,
    errors: { 
        email: string,
        password: string
    }
}
// handleChange = (event: any) => {
//     event.preventDefault();
//     const { name, value} = event.target;
//     let errors = this.state.errors;
//     switch (name) {
//         case 'email':
//             errors.email = Regex.test(value)? '' : 'Email is not valid!';
//             break;
//         case 'password':
//             errors.password = value.length < 8 ? 'Password must be eight charachters long!': '';
//             break;
//         default:
//             break;
//     }
//     this.setState(Object.assign(this.state, { errors, [name]: value}));
//     console.log(this.state);
// }
// handleSubmit = (event: any) => {
//     event.preventDefault();
//     let validity = true;
//     Object.values(this.state.errors).forEach(
//         (val) => val.length > 0 && (validity = false)
//     );
//     if (validity === true){
//         console.log("login complete");
//     } else {
//         console.log("login failed")
//     }
// }

export class SignUp extends React.Component <LoginProps, LoginState> {

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value} = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = Regex.test(value)? '' : 'Email is not valid!';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be eight charachters long!': '';
                break;
            default:
                break;
        }
        this.setState(Object.assign(this.state, { errors, [name]: value}));
        console.log(this.state);
    }
    handleSubmit = (event: any) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if (validity === true){
            console.log("login complete");
        } else {
            console.log("login failed")
        }
    }

    constructor(props: LoginProps) {
        super(props);
        const initialState = {
            email : '',
            password: '',
            errors: {
                email: '',
                password: '',
            }
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    
    
    render () {
        const {errors} = this.state
        return (
            <div className="container">
            <div className="login-register">
                <div className="nav-buttons">
                    <button id="loginBtn" className='active'>Login</button>
                    <button id="registerBtn">Register</button>
                </div>
                <div className="form-group">
                    <form action="" id="loginform">
                        <label htmlFor="username">email</label> 
                        <input type="text" id="username" onChange={this.handleChange} />
                            {errors.email.length > 0 && <span style={{color: "red"}}>{errors.email}</span>}
                        <label htmlFor="password">password</label>
                        <input type="text" id="password" onChange={this.handleChange} />
                            {errors.password.length > 0 && <span style={{color: "red"}}>{errors.password}</span>}
                        <input type="submit" value="Submit" className="submit" onSubmit={this.handleSubmit} />
                    </form>
                    <form action="" id="registerform">
                        <label htmlFor="firstname">first name</label>
                        <input type="text" id='firstname'></input>
                        <label htmlFor="lastname">last name</label>
                        <input type="text" id="lastname"></input>
                        <label htmlFor="email">email</label>
                        <input type="text" id="email"></input>
                        <label htmlFor="password">password</label>
                        <input type="text" id="password"></input>
                        <label htmlFor="confirmpassword">confirm password</label>
                        <input type="text" id="confirmpassword"></input>
                        <input type="submit" value="Submit" className="submit"></input>
                    </form>
                </div>
                
                <div id="forgot">
                    <a href="">forgot password?</a>
                </div>
            </div>
           
        </div>
        )
    }
}