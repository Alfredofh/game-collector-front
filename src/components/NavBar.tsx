// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar: React.FC = () => {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <StyledLink to="/home">Home</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/collection">My Collection</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/search">Search Games</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/prices">Prices</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/profile">Profile</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/logout">Logout</StyledLink>
                </NavItem>
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

export default NavBar;
