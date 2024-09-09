import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../API/api';
import { useNavigate } from 'react-router-dom';

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  color: #ff0000;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  background-color: #ff0000;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 10px;
`;

const LawyerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/lawyer/login', { email, password });
      // Handle successful login (e.g., redirect to dashboard or store token)
      const { token, user } = response.data;
      localStorage.setItem('SIH-User', JSON.stringify(user));
      console.log(token);
      alert("successfully logged in")
      navigate('/lawyer/dashboard')
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Title>Lawyer Login</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleLogin}>Login</Button>
    </LoginContainer>
  );
};

export default LawyerLogin;
