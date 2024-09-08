import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000; // Black background
  color: #fff; // White text
`;

const Section = styled.div`
  flex: 1;
  border: 2px solid #ff0000; // Red borders
  margin: 20px;
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: #fff; // White section background
  color: #000; // Black text for sections
  height: 80%;

`;

const Header = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  width: 30px;
  height: 3px;
  background-color: red; // White hamburger bars
  margin: 6px 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  width: 10rem;
  background-color: #000; // Black background for dropdown
  border: 1px solid #ff0000; // Red border for dropdown
  display: ${(props) => (props.open ? 'block' : 'none')};
  color: #fff; // White text for dropdown
`;

const DropdownItem = styled.div`
a{
  text-decoration: none;
  color: inherit;
}
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000; // Red background on hover
    color: #fff; // White text on hover
  }
`;

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DashboardContainer>
      <Section>Judges</Section>
      <Section>Lawyers</Section>
      <Section>Police Stations</Section>

      <Header>
        <div onClick={toggleMenu}>
          <HamburgerMenu />
          <HamburgerMenu />
          <HamburgerMenu />
        </div>
        <DropdownMenu open={isOpen}>
          <DropdownItem><Link to="/admin/register/judge">Register Judges</Link></DropdownItem>
          <DropdownItem><Link to="/admin/register/lawyer" >Register Lawyers</Link></DropdownItem>
          <DropdownItem><Link to="/admin/register/police" >Register Police Stations</Link></DropdownItem>
        </DropdownMenu>
      </Header>
    </DashboardContainer>
  );
};

export default AdminDashboard;
