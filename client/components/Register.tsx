
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store';
import { CreateUserDto } from '../../shared/types';
import { TextField, Button } from '@mui/material';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registerData: CreateUserDto = { name, email, password };
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUser(data));
        navigate('/');
      })
      .catch(error => {
        console.error('Registration failed:', error);
        // TODO: Display error message to the user
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

export default Register;

