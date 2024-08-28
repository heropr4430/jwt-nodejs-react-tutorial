import React, { useEffect, useState, useContext } from 'react';
import './nav.scss';
import { toast } from 'react-toastify';

import { NavLink, useLocation, Redirect, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo192.png'
import { logoutUser } from '../../services/userService'
const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    let location = useLocation();
    const history = useHistory();
    const handleLogout = async () => {
        let data = await logoutUser();//clear cookies
        localStorage.removeItem('jwt');//clear local storage
        if (data && data.EC === 0) {
            logoutContext();// clear User
            toast.success('log out succeeds')
            history.push('/login')
        }
        else {
            toast.error(data.EM)
        }

    }
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-header">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-center"
                                // alt="React Bootstrap logo"
                                />
                                <span className='brand-name'>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to='/' exact className='nav-link'>Home</NavLink>
                                    <NavLink to='/users' exact className='nav-link'>Users</NavLink>
                                    <NavLink to='/roles' exact className='nav-link'>Roles</NavLink>
                                    <NavLink to='/group-role' exact className='nav-link'>Group-Role</NavLink>
                                    <NavLink to='/projects' exact className='nav-link'>Projects</NavLink>
                                    <NavLink to='/about' exact className='nav-link'>About</NavLink>

                                </Nav>

                                <Nav>
                                    {
                                        user && user.isAuthenticated === true ?
                                            <>
                                                <Nav.Item className='nav-link'>Welcome {user.account.username} !</Nav.Item>
                                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                    <NavDropdown.Item >Change password</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item >
                                                        <span onClick={handleLogout}>Log out</span>
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </> :
                                            <Link className='nav-link' to='/login'>Login</Link>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

            </>

        )
    } else {
        return <></>
    }
}

export default NavHeader;