import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  color: #fff;
  position: relative;
  padding: 20px;
`;

const HamburgerMenu = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 1.5rem;
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

const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; // Adjust as needed
`;

const CaseItem = styled.div`
  background-color: #333;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
  }
`;

const DefDashboard = () => {
  const [cases, setCases] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('SIH-User'));
    if (user) {
      setCases(user.cases || []);
    }
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <DashboardContainer>
      <HamburgerMenu onClick={handleMenuToggle}>
        ☰
      </HamburgerMenu>
      <NavDropdown show={showMenu}>
        <NavLink to="/lawyers">Lawyers List</NavLink>
        <NavLink to="/cases">Cases</NavLink>
        <NavLink to="/rsvp">RSVP</NavLink>
      </NavDropdown>
      <CaseList>
        {cases && cases.map((id) => (
          <CaseItem key={id}>
            <Link to={`/user/case-details/${id}`}>
              Case - {id}
            </Link>
          </CaseItem>
        ))}
      </CaseList>
    </DashboardContainer>
  );
};

export default DefDashboard;
