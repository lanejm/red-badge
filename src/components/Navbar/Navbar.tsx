import React from 'react';
import Logout from './Logout/Logout';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './navbar.css';

interface NavProps {
  isLoggedIn: boolean;
  clearToken: any;
  setShowCreate: (e:any) => void;
}
interface NavState {
  collapsed: boolean;


}

class NavFile extends React.Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      collapsed: true,
      
    }
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    return (
      <div>
        <Navbar light id="navbarTop">
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {this.props.isLoggedIn ? 
              <>
              <NavItem>
                <Link to="/create">
                  <Button className="navButtons" onClick={() => this.props.setShowCreate(true)}>Create Gift Entry</Button>
                  </Link>
              </NavItem>
              <NavItem>
                <NavLink><Logout clearToken={this.props.clearToken} />
                </NavLink>
              </NavItem>
              </> : null }
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