import React, { useState } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import api from '../../../API/api'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import {abi} from '../../../abi'

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const Form = styled.form`
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  h2 {
    text-align: center;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #333;
  color: #fff;

  &:focus {
    border-color: #fff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff0000;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

const web3 = new Web3(window.ethereum); // Adjust provider as needed

const contractAddress = '0xA4bd3b69114E22096CbF24D285Ae0c56e3025186'; // Replace with your contract address

const contract = new web3.eth.Contract(abi, contractAddress);

const RegPolice = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    stationLocation: '',
    walletAddress: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register police station data in MongoDB
      await api.post('/admin/police/register', formData);

      // Assign the role of Police to the wallet address
      const accounts = await web3.eth.getAccounts();
      const adminAccount = accounts[0]; // Assuming the first account is the admin

      await contract.methods.assignRole(formData.walletAddress, 1) // 0 corresponds to Police role
        .send({ from: adminAccount });

      alert('Police Station registered and role assigned successfully');
      navigate('/admin/dashboard');
      setFormData({
        name: '',
        email: '',
        password: '',
        stationLocation: '',
        walletAddress: ''
      });
    } catch (err) {
      setError('Error registering police station or assigning role');
      console.log(err.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Register Police Station</h2>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Input
          type="text"
          name="stationLocation"
          value={formData.stationLocation}
          onChange={handleChange}
          placeholder="Station Location"
        />
        <Input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleChange}
          placeholder="Wallet Address"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
};

export default RegPolice;
