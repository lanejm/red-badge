import React, {useState} from 'react'
import { Button } from 'reactstrap'
import '../../components/Auth/LoginRegister/main.css';

const LandingPage = (props: any): JSX.Element => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, setLogin] = useState(true)

    const loginToggle = () => {
        setLogin(!login)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const url = `http://localhost:8081/user/${login ? 'login' : 'register'}`
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        if (password.length > 8) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
        .then(rObj => props.updateToken(rObj.sessionToken, rObj.user.id))
    } else {
        window.alert("Password must be at least 8 characters")
    }}
    

    const signupFields = () => {
        if (login) {
            return null
        } else {
            return (
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <br/>
                    <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <br/>
                    <label htmlFor="lastName">Last Name</label>
                    <br/>
                    <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
            )
        }
    }

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
                    <input type="text" id="username"></input>
                    <label htmlFor="password">password</label>
                    <input type="text" id="password"></input>
                    <input type="submit" value="Submit" className="submit"></input>
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

export default LandingPage;

//reactstrap form?