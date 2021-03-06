import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';

const Styles = styled.div`
  .navbar {
    background-color: black;
    position: fixed;
    z-index: 1020;
    width: 100%;
    opacity: .8;
  }
  .navbar-toggler-icon {
    background-color: white;
  }
  #dropdown-basic {
    font-weight: bold; 
    font-size: 24px;
    padding: 9px 8px 0px 8px;
    color: white;
  }
  #dropdown-basic:hover {
    color:orange;
  }
  #dropdown-basic:focus {
    color:orange;
  }
  .dropdown-item {
    background-color: white;
  }
  .dropdown-item:hover {
    color: orange;
  }
  @media  (max-width: 576px) {
    #dropdown-basic {
      padding: 8px 0px 0px 0px
    }
    .navbar {
      position: relative;
    }
  }
`;

const StyledLink = styled(Link)`
  color: white !important;
      &:hover {
      color: orange !important;
    }
      &:focus {
        color: orange !important;
    }
  font-weight: bold;
  font-size: 24px;
`;

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <>
      <Styles>
        <Navbar expand='lg'>
          <Navbar.Brand as={StyledLink} to='/'><h2>My DigiLib</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={StyledLink} to='/'>
                  Home
                  </Nav.Link>
                  <Nav.Link as={StyledLink} to={`/books/${localStorage.getItem('user_id')}`}>List My Books
                  </Nav.Link>
                  <NavDropdown id="dropdown-basic" title="Add New Books">
                    <Dropdown.Item href='/addbookisbn' className='drop-item'>Search for Books with ISBN</Dropdown.Item>
                    <Dropdown.Item href='/addbookmanual' className='drop-item'>Add Books Manually</Dropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={StyledLink} to='/' onClick={logout}>Logout
                  </Nav.Link>
                </>
              ) : (
                  <>
                    <Nav.Link as={StyledLink} to='/login'>Login
                    </Nav.Link>
                    <Nav.Link as={StyledLink} to='/signup'>Signup
                    </Nav.Link>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </>
  );
};

export default Header;
