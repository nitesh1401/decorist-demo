import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink
  } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../../App.css';
import LogOut from '../../container/Auth/LogOut';
import decoristLogo from '../../assets/images/decorist-logo.svg';

const header = props => {
    let navData = null;
    if (
      (props.modalContent === null || props.userName === null) &&
      !props.isAuthenticated
    ) {
      navData = (
        <NavItem className="NavItem">
          <button className="Button" onClick={() => props.modalHandler('logIn')}>
            Log In
          </button>
        </NavItem>
      );
    } else {
      // logInMessage = (<div style={{zIndex:"1", textAlign: "center", width: "100%", height: "40px", color:"#fff", backgroundColor: "#008000"}} >
      //                   You are successfully loggedIn!
      //                 </div>);
      navData = (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle style={{ color: '#000' }} nav caret>
            Hi {props.userName ? props.userName : null}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
                <Link to="/your-projects"> Your Projects </Link>
            </DropdownItem>
            <DropdownItem divider />
            <LogOut
              loggingOut={props.loggedOut}
              setAppState={props.onTryAutoSignup}
            />
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    return (
        <div className="header">
             <Navbar fixed="top" expand="md">
            <Nav className="ml-auto" navbar>
                <NavbarBrand style={{ marginRight: '30px' }} href="/">
                <img src={decoristLogo} alt="Decorist Logo" />
                </NavbarBrand>
                <NavItem>
                <NavLink className="NavItemColor" href="#">
                    Design Services
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">
                    Our Designers
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">
                    Client Projects
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">
                    Design Bar
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className="NavItemColor"
                    href="#"
                    style={{ marginRight: '265px' }}
                >
                    Blog
                </NavLink>
                </NavItem>
                {navData}
                <NavItem className="NavItem">
                <button
                    className="Button"
                    style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    width: '130px'
                    }}
                >
                    Start a Project
                </button>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
    );
};

export default header;