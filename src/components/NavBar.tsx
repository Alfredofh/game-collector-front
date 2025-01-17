import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/authContext';

const NavBar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Nav>
            <NavList>
                <NavItem>
                    <StyledLink to="/dashboard">Home</StyledLink>
                </NavItem>
                {isAuthenticated ? (
                    <>
                        <NavItem>
                            <StyledLink to="/collections">My Collections</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/collection/new">New Collection</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/scanner">Search Games</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/prices">Prices</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/profile">Profile</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledButton onClick={logout}>Logout</StyledButton>
                        </NavItem>
                    </>
                ) : (
                    <>
                        <NavItem>
                            <StyledLink to="/login">Login</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/register">Register</StyledLink>
                        </NavItem>
                    </>
                )}
            </NavList>
        </Nav>
    );
};

const Nav = styled.nav`
    background-color: #333;
    padding: 10px;
    display: flex;
    justify-content: space-around;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
`;

const NavItem = styled.li`
    color: #fff;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-family: 'Press Start 2P', cursive;

    &:hover {
        color: #1b9aaa;
    }
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    color: #ffffff;
    font-family: 'Press Start 2P', cursive;
    cursor: pointer;

    &:hover {
        color: #1b9aaa;
    }
`;

export default NavBar;
