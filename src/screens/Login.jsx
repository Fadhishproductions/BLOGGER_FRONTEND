import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { setCredentials } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/api/authApi';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginUserMutation();

  const { user } = useSelector((state) => state.user);
 const naivgate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, user } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user, accessToken }));
      toast.success("User logged successfully")
      navigate("/")

    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.data.message || "Somthing wrong!")
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Log In</h1>
          
    <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formEmail"> 
      <Form.Control
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword"> 
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </Form.Group>
      <Button type="submit" className='w-100' disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
    </Col>
          </Row>
          </Container>
  );
};

export default Login;
