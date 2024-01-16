import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const NavBar = () => {

    const user = useSelector(state => state.user);

    const [login, setLogin] = useState('');

    useEffect(() => {
        setLogin(user)
    }, [user])

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Nav.Link as={NavLink} to="/">
                    <Navbar.Brand>Announcement.app</Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="justify-content-end" >
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        {!login && <Nav.Link as={NavLink} to="/login">Sign In</Nav.Link>}
                        {!login && <Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>}
                        {login && <Nav.Link as={NavLink} to="/logout">Sign Out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;