import React from 'react'
import { Button } from 'reactstrap'
import '../Auth/auth.css'
import APIURL from '../../helpers/environment';


interface AuthProp {
    // firstName: string;
    // lastName: string;
    // email: string;
    // password: string;
    // login: boolean;
    updateToken: (newToken: string, id: any) => void;
    // e: any;
    setIsLoggedIn: (e: any) => void
}

interface AuthState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    login: boolean;
    sessionToken: string;
    userId: string;
    isLoggedIn: boolean;
    clearToken: any;
    updateToken: string;
    input: any;
    errors: any;
}

class Auth extends React.Component<AuthProp, AuthState> {
    constructor(props: AuthProp) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            login: false,
            sessionToken: '',
            updateToken: '',
            userId: 'userId',
            input: {},
            errors: {},
            isLoggedIn: false,
            clearToken: () => {
                this.setState({
                    isLoggedIn: false
                })
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    loginToggle = () => {
        this.setState({ login: !this.state.login })
    }

    updateToken = (newToken: any, id: any) => {
        localStorage.setItem('id', id)
        localStorage.setItem('token', newToken)
        this.setState({ sessionToken: newToken, userId: id, isLoggedIn: true })
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        const url = `${APIURL}/user/${this.state.login ? 'login' : 'register'}`
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.password.length > 8) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(r => r.json())
                .then(rObj => {
                    if(rObj.error) {
                        window.alert(rObj.error)
                    } else {
                    this.updateToken(rObj.sessionToken, rObj.user.id)  //add in if else here?
                    this.props.setIsLoggedIn(true) }
                })
                .catch(err => console.log(err))
            // this.setState({isLoggedIn:true})
        } else {
            window.alert("Password must be at least 8 characters")
        }
    }

    validateEmail(email: any) {
        const emailFormat = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(String(email).toLowerCase()))
        if (email.match(emailFormat)) {
            alert("Great Email!")
            return true;
        };
        alert("That's not an email?!")
        return (false);
    }


    signupFields = () => {
        if (this.state.login) {
            return null
        } else {
            return (
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <br />
                    <input id="firstName" value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                    <br />
                    <label htmlFor="lastName">Last Name</label>
                    <br />
                    <input id="lastName" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <form className='login-register' style={{ transition: 'all 1s ease' }}>
                    <h1>{this.state.login ? 'Login' : 'Register'}</h1>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input id="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" id="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    <br />
                    {this.signupFields()}
                    <br />
                    <Button type='button' className="loginBtn" style={{backgroundColor: 'rgb(236, 99, 30)'}}
                        onClick={this.loginToggle}
                    >
                        {this.state.login ? "Click Here to Register" : "Click Here to Login"}
                    </Button>
                    <Button onClick={(e: any) => this.handleSubmit(e)} type='button' className="submitBtn" style={{backgroundColor: "rgb(64, 173, 206)"}}>Submit</Button>


                </form>
            </div>
        )
    }
}

export default Auth;


//reactstrap form?

//login is not showing gift list based on id.
//login and password verification logic