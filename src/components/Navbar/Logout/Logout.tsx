import React from 'react';
import {Button} from 'reactstrap';
import "./logout.css"

//make this a class component, clearToken as a prop? 
interface LogoutProps {
    clearToken: any;
}

interface LogoutState {
    clearToken: '';
}


class Logout extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutProps) {
        super(props)
        this.state = {
            clearToken: '',
        }
    }

    clearToken() {
    this.setState({
      clearToken: ''
    })
    console.log("test of clear token")
    localStorage.clear()
  }


  render () {
      return(
          <div>
              <Button className="navButtons" color="danger" id="logout" onClick={() => this.props.clearToken()}>Logout</Button>
          </div>
      )
  }
}

export default Logout;

// const Logout = (props: any) => {

//     return(
//         <div>
//             <Button className="navButtons" color='danger' id='logout' onClick={() => props.clearToken()}>Logout</Button>
//         </div>
//     )
// }

// export default Logout