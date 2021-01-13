import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

//change to class component


interface AuthProp {
    // firstName: string;
    // lastName: string;
    // email: string;
    // password: string;
    // login: boolean;
    updateToken: (newToken: string, id: any) => void;
    // e: any;
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
            isLoggedIn: false,
            clearToken: () => {
                this.setState({
                    isLoggedIn: false
                })
            }
        }
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
        const url = `http://localhost:8081/user/${this.state.login ? 'login' : 'register'}`
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
                .then(rObj => this.updateToken(rObj.sessionToken, rObj.user.id))
                // this.setState({isLoggedIn:true})
        } else {
            window.alert("Password must be at least 8 characters")
        }
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
                <form>
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
                    <Button type='button'
                        onClick={this.loginToggle}
                    >
                        {this.state.login ? "Click Here to Register" : "Click Here to Login"}
                    </Button>
                    <Button onClick={(e: any) => this.handleSubmit(e)} type='submit'>Submit</Button>


                </form>
            </div>
        )
    }
}

export default Auth;


// const Auth = (props: any) => {

//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const [login, setLogin] = useState(true)

//     const loginToggle = () => {
//         setLogin(!login)
//     }

//     const handleSubmit = (e: any) => {
//         e.preventDefault()
//         const url = `http://localhost:8081/user/${login ? 'login' : 'register'}`
//         const body = {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: password
//         }
//         if (password.length > 8) {
//             fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             }).then(r => r.json())
//                 .then(rObj => props.updateToken(rObj.sessionToken, rObj.user.id))
//         } else {
//             window.alert("Password must be at least 8 characters")
//         }
//     }


//     const signupFields = () => {
//         if (login) {
//             return null
//         } else {
//             return (
//                 <div>
//                     <label htmlFor="firstName">First Name</label>
//                     <br />
//                     <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
//                     <br />
//                     <label htmlFor="lastName">Last Name</label>
//                     <br />
//                     <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
//                 </div>
//             )
//         }
//     }

//     return (
//         <form>
//             <h1>{login ? 'Login' : 'Register'}</h1>
//             <label htmlFor="email">Email</label>
//             <br />
//             <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
//             <br />
//             <label htmlFor="password">Password</label>
//             <br />
//             <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
//             <br />
//             {signupFields()}
//             <br />
//             <Button type='button' onClick={loginToggle}>
//                 {login ? "Click Here to Register" : "Click Here to Login"}
//             </Button>
//             <Button onClick={handleSubmit} type='submit'>Submit</Button>
//         </form>
//     )
// }

// export default Auth

//reactstrap form?

//login is not showing gift list based on id.