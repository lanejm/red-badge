import React, {useState} from 'react';
import Logout from './Logout/Logout';
import {Link} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';

const NavFile = (props: any) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

return (
  <div>
    <Navbar color="faded" light>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <Link to="/create"><Button className="navButtons" color='success'>Create Gift Entry</Button></Link>
          </NavItem>
          <NavItem>
            <NavLink > <Logout clearToken={props.clearToken} /></NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);
}

export default NavFile