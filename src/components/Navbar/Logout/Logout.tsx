import React from 'react';
import { Redirect } from 'react-router-dom';
import {Button} from 'reactstrap';
import "./logout.css"

 
interface LogoutProps {
    clearToken: any;
    
}

interface LogoutState {
    
}


class Logout extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutProps) {
        super(props)
        this.state = {
           
        }
    }


  render () {
      return(
          <div>
              <Button className="navButtons" id="logout" onClick={() => this.props.clearToken()}>Logout</Button>
              <Redirect to="/" />
          </div>
      )
  }
}

export default Logout;
