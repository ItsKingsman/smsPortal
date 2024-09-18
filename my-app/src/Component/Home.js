import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar_content">
    <Container>
      <Navbar.Brand className='header_title' href="#home"><i class="fa-solid fa-mobile"></i>SMS Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex">
          <Nav.Link as={Link} to="/smshome" className='right'>Home</Nav.Link>
          <Nav.Link as={Link} to="/AddLibrary">Add Library</Nav.Link>
          <Nav.Link as={Link} to="/AddGroup" className='right'>Add Group</Nav.Link>                   
          <Nav.Link as={Link} to="/AddContact" className='right'>Add Contact</Nav.Link>                   
          <Nav.Link as={Link} to="/AddMessage" className='right'>Add Message</Nav.Link>                   
        </Nav>            
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}
