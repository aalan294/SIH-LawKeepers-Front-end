import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  position: relative;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

const QuoteContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #ff0000;
`;

const Quote = styled.p`
  font-style: italic;
  margin-bottom: 20px;
`;

const Author = styled.p`
  font-weight: bold;
`;

const HamburgerMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1000;
  color: #fff;
`;

const NavDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #222;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-bottom: 1px solid #ff0000;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #333;
    color: #ff0000;
  }
`;

const JudDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('SIH-User');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <DashboardContainer>
      <HamburgerMenu onClick={handleMenuToggle}>
        ☰
      </HamburgerMenu>
      <NavDropdown show={showMenu}>
        <NavLink to="/judge/case">Cases</NavLink>
        <NavLink as="button" onClick={handleLogout}>Logout</NavLink>
      </NavDropdown>
      <QuoteContainer>
        <Quote>"Justice delayed is justice denied."</Quote>
        <Author>- William E. Gladstone</Author>
      </QuoteContainer>
    </DashboardContainer>
  );
};

export default JudDashboard;
