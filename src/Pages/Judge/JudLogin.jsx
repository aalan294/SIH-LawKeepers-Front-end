import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../API/api'; // Update this path based on your project structure
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
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  color: #ff0000;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background-color: #222;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #333;
  color: #fff;

  &::placeholder {
    color: #bbb;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
  margin-top: 10px;
`;

const JudLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login API
      const response = await api.post('/judge/login', { username, password });

      // Store the user data in local storage
      localStorage.setItem('SIH-User', JSON.stringify(response.data));

      alert("logged in successfully")// Redirect to the dashboard or home page
      navigate("/judge/dashboard")
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Title>Judge Login</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="mail"
          placeholder="gmail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </LoginContainer>
  );
};

export default JudLogin;
