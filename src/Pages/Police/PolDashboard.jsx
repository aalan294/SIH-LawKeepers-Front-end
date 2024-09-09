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
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
`;

const HamburgerMenu = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 2rem;
  z-index: 1000;
  color: #fff;
`;

const NavDropdown = styled.div`
  position: fixed;
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

const Quote = styled.div`
  font-size: 1.5rem;
  color: #ff0000;
  margin: 20px;
  max-width: 800px;
  line-height: 1.5;
`;

const PolDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <DashboardContainer>
      <HamburgerMenu onClick={handleMenuToggle}>
        ☰
      </HamburgerMenu>
      <NavDropdown show={showMenu}>
        <NavLink to="/police/new-case">New Case</NavLink>
        <NavLink to="/police/update-case">Update Case Details</NavLink>
      </NavDropdown>
      <Quote>
        "The strength of justice is in the hands of those who enforce it. Protect the innocent, uphold the law, and never let injustice prevail."
      </Quote>
      <Quote>
        "A true officer's courage lies not in their power, but in their dedication to the truth, no matter the cost."
      </Quote>
      <Quote>
        "Justice is blind, but officers are the eyes that guide her."
      </Quote>
    </DashboardContainer>
  );
};

export default PolDashboard;
