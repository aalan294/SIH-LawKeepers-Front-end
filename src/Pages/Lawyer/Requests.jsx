import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import api from '../../API/api'; // Update this path based on your project structure
import {abi} from '../../abi'

const web3 = new Web3(window.ethereum); // Replace with your Ethereum node URL
const contractAddress = '0xA4bd3b69114E22096CbF24D285Ae0c56e3025186'; // Replace with your smart contract address
const contract = new web3.eth.Contract(abi, contractAddress);

// Styled Components
const RequestsContainer = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff0000;
  margin-bottom: 20px;
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RequestCard = styled.div`
  background-color: #222;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const RequestDetails = styled.div`
  color: #fff;
`;

const AcceptButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
`;

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Get the lawyer's ID from local storage
        const user = JSON.parse(localStorage.getItem('SIH-User'));
        const lawyerId = user?._id;
        
        // Fetch the requests from the backend
        const response = await api.get(`/request/${lawyerId}`);
        console.log(response)
        setRequests(response.data);
      } catch (err) {
        setError('Error fetching requests');
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId, caseId) => {
    try {
      // Connect to MetaMask
      if (window.ethereum) {
        const accounts = await web3.eth.getAccounts();
        const lawyerAddress = accounts[0]; // Your contract ABI here

        // Update the case in the smart contract
        await contract.methods.assignLawyerToCase(caseId, lawyerAddress).send({ from: lawyerAddress });

        // Update the request status to accepted
        await api.put(`/request/${requestId}`, { status: 'accepted' });

        // Refresh the request list
        setRequests(requests.filter(request => request._id !== requestId));
      } else {
        setError('MetaMask not detected');
      }
    } catch (err) {
      setError('Error accepting request');
      console.error(err);
    }
  };

  return (
    <RequestsContainer>
      <Title>Requests</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <RequestList>
        {requests.map(request => (
          <RequestCard key={request._id}>
            <RequestDetails>
              <p><strong>Case ID:</strong> {request.caseId}</p>
              <p><strong>Request ID:</strong> {request._id}</p>
              <p><strong>Defendant:</strong> {request.defendantName}</p>
            </RequestDetails>
            <AcceptButton onClick={() => handleAccept(request._id, request.caseId)}>
              Accept
            </AcceptButton>
          </RequestCard>
        ))}
      </RequestList>
    </RequestsContainer>
  );
};

export default Requests;
