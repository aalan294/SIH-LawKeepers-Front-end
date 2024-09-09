import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const DashboardContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #222;
  border-bottom: 2px solid #ff0000;
  position: fixed;
  width: 97%;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
width: 80%;
  text-align: center;
  font-size: 1.8rem;
  color: #ff0000;
  margin: 0;
`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  font-size: 2rem;
  color: #ff0000;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #333;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 15px;
  background-color: #333;
  border: 1px solid #ff0000;
  border-radius: 5px;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 20px;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #444;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #ff0000;
  margin-top: 80px;  /* Margin to avoid overlap with fixed header */
  font-size: 2.5rem;
`;

const QuoteContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Quote = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: #fff;
  margin: 15px 0;
`;

const LawDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <DashboardContainer>
      <Header>
        <Logo>Lawyer Dashboard</Logo>
        <HamburgerMenu onClick={toggleMenu}>☰</HamburgerMenu>
        <DropdownMenu open={menuOpen}>
          <DropdownItem to="/lawyer/requests">Requests</DropdownItem>
          <DropdownItem to="/lawyer/case">Cases</DropdownItem>
        </DropdownMenu>
      </Header>
      <Title>Welcome to Your Dashboard</Title>
      <QuoteContainer>
        <Quote>"Justice delayed is justice denied."</Quote>
        <Quote>"Injustice anywhere is a threat to justice everywhere."</Quote>
        <Quote>"The law must be stable, but it must not stand still."</Quote>
      </QuoteContainer>
    </DashboardContainer>
  );
};

export default LawDashboard;
