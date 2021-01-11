import React from 'react';
import {Button} from 'reactstrap';
import "./logout.css"

//make this a class component, clearToken as a prop? 
const Logout = (props: any) => {

    return(
        <div>
            <Button className="navButtons" color='danger' id='logout' onClick={() => props.clearToken()}>Logout</Button>
        </div>
    )
}

export default Logout