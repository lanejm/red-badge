import React from 'react';
import Logout from './Logout/Logout';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button, } from 'reactstrap';
import '../../App.css';

interface NavProps {
  isLoggedIn: boolean;
  clearToken: any;
  setShowCreate: (e: any) => void;
  setHolidayCreate: (e: any) => void;
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
          <NavbarToggler id="navbarToggler" onClick={this.toggleNavbar} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {this.props.isLoggedIn ?
                <>
                  <NavItem>
                    <Link to="/create">
                      <Button className="navButtons" style={{ backgroundColor: "rgb(130, 217, 87)" }} onClick={() => this.props.setShowCreate(true)}>Add a Gift!</Button>
                    </Link>
                    <Link to="/holidays/create">
                      <Button className="navButtons" style={{ backgroundColor: "rgb(130, 217, 87)", }} onClick={() => this.props.setHolidayCreate(true)}>Add a Holiday!</Button>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <NavLink><Logout clearToken={this.props.clearToken} />
                    </NavLink>
                  </NavItem>
                </> : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  };
}

export default NavFile;
