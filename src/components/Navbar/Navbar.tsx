import React, { useState } from 'react';
import Logout from './Logout/Logout';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';
// import './Navbar.css';

interface NavProps {
  isLoggedIn: boolean;
  clearToken: any;
}
interface NavState {
  collapsed: boolean;
  clearToken: any;
  isLoggedIn: boolean;
}

class NavFile extends React.Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      collapsed: true,
      isLoggedIn: false,
      clearToken: () => {
        this.setState({
          isLoggedIn: false
        })
      }
    }
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    return (
      <div>
        <Navbar color="faced" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/create"><Button clasName="navButtons" color="success">Create Gift Entry</Button></Link>
              </NavItem>
              <NavItem>
                <NavLink><Logout clearToken={this.props.clearToken} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  };
}

export default NavFile;


// const NavFile = (props: any) => {
//     const [collapsed, setCollapsed] = useState(true);
//     const toggleNavbar = () => setCollapsed(!collapsed);

// return (
//   <div>
//     <Navbar color="faded" light>
//       <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//       <Collapse isOpen={!collapsed} navbar>
//         <Nav navbar>
//           <NavItem>
//             <Link to="/create"><Button className="navButtons" color='success'>Create Gift Entry</Button></Link>
//           </NavItem>
//           <NavItem>
//             <NavLink > <Logout clearToken={props.clearToken} /></NavLink>
//           </NavItem>
//         </Nav>
//       </Collapse>
//     </Navbar>
//   </div>
// );
// }

// export default NavFile