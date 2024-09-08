import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../../API/api'
import { useNavigate } from 'react-router-dom';

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
  h2{
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

const JudRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
      const response = await api.post('/admin/judge/register', formData);
      console.log(response);
      alert('Judge registered successfully');
      navigate('/admin/dashboard')
      setFormData({
        name: '',
        email: '',
        password: '',
        walletAddress: ''
      });
    } catch (err) {
      setError('Error registering judge');
      console.log(error.message)
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Register Judge</h2>
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

export default JudRegister;
