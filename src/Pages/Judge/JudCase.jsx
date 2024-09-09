import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../API/api'; // Update this path based on your project structure

// Styled Components
const LawCaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  color: #fff;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff0000;
  margin-bottom: 20px;
`;

const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CaseItem = styled.div`
  background-color: #222;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
`;

const JudCase = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch the requests from the backend
        console.log("hii")
        const response = await api.get(`/judge/case`);
        console.log(response)
        setCases(response.data);
      } catch (err) {
        setError('Error fetching requests');
        console.error(err);
      }
    };
    fetchRequests();
  },[])

  return (
    <LawCaseContainer>
      <Title>Accepted Cases</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <CaseList>
        {cases.length > 0 ? (
          cases.map((request) => (
            <CaseItem key={request._id}>
              <Link to={`/judge/case-details/${request.caseId}`}>
                Case - {request.caseId}
              </Link>
            </CaseItem>
          ))
        ) : (
          <p>No accepted cases found.</p>
        )}
      </CaseList>
    </LawCaseContainer>
  );
};

export default JudCase;
