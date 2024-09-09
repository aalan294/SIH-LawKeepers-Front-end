import React, { useState, useEffect } from 'react';
import api from '../../API/api';
import styled from 'styled-components';

// Styled Components
const LawyerListContainer = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #ff0000;
  margin-bottom: 20px;
`;

const LawyerCard = styled.div`
  background-color: #222;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const LawyerName = styled.h3`
  margin-bottom: 10px;
  color: #fff;
`;

const WalletAddress = styled.p`
  color: #ff0000;
  word-break: break-word;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [caseId,setcaseId] = useState(0)

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await api.get('/user/law-list');
        setLawyers(response.data);
      } catch (err) {
        setError('Error fetching lawyer list');
        console.error(err);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem('SIH-User'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    } else {
      setError('User information not found');
    }

    fetchLawyers();
  }, []);

  const sendRequestToLawyer = async (lawyerId,caseId) => {
    if (!userId) {
      setError('User information not available');
      return;
    }

    try {
      await api.post('/request/lawyer', { defendant: userId, lawyer: lawyerId, caseId });
      alert('Request sent to lawyer');
    } catch (err) {
      setError('Error sending request');
      console.error(err);
    }
  };

  return (
    <LawyerListContainer>
      <Title>List of Lawyers</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {lawyers.map((lawyer) => (
        <LawyerCard key={lawyer._id}>
          <LawyerName>{lawyer.name}</LawyerName>
          <WalletAddress>{lawyer.walletAddress}</WalletAddress>
          <input type="number" value={caseId} onChange={(e)=>setcaseId(e.target.value)} />
          <Button onClick={() => sendRequestToLawyer(lawyer._id,caseId)}>Request Lawyer</Button>
        </LawyerCard>
      ))}
    </LawyerListContainer>
  );
};

export default LawyerList;
