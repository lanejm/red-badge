import React from 'react';
import {Button} from 'reactstrap';
import "./logout.css"


const Logout = (props: any) => {
    const logout = () => {
        props.clearToken()
    }
    return(
        <div>
            <Button className="navButtons" color='danger' id='logout' onClick={logout}>Logout</Button>
        </div>
    )
}

export default Logout