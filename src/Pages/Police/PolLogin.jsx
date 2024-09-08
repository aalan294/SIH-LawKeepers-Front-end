import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api'

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

const PolLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/police/login', formData);
      if (response.status === 200) {
        alert('Login successful');
        navigate('/police/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.log(err.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Police Station Login</h2>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default PolLogin;
