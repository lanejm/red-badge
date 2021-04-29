import React, {useState} from 'react'
import { Button } from 'reactstrap'

const Auth = (props: any) => {

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
        <form>
            <h1>{login ? 'Login' : 'Register' }</h1>
            <label htmlFor="email">Email</label>
            <br/>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br/>
            {signupFields()}
            <br/>
            <Button type='button' onClick={loginToggle}>
                {login ? "Click Here to Register" : "Click Here to Login"} 
            </Button>
            <Button onClick={handleSubmit} type='submit'>Submit</Button>
        </form>
    )
}

export default Auth
