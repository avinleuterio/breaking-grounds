import React, { useState, useEffect, useContext } from 'react';
import { Button, TextInputField, Pane, toaster } from 'evergreen-ui'; // Import the toaster
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login({ onClose }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
     .then(data => {
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        retrieveUserDetails(data.accessToken);
        toaster.success('Login Successful! Welcome to Breaking Grounds!'); // Use toaster for success
        onClose();  // Close the modal on successful login
      } else {
        toaster.danger('Authentication failed! Check your details.'); // Use toaster for failure
      }
      setUsername("");
      setPassword("");
    });
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      });
    });
  }

  useEffect(() => {
    setIsActive(username !== '' && password !== '');
  }, [username, password]);

  return (
    user.id !== null ?
    navigate('/')
    :
    <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" marginBottom={30}>
      <h1>Login</h1>
      <TextInputField
          label="Username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          marginBottom={16}
          width={400}
          onKeyDown={(e) => {
              if (e.key === 'Enter' && isActive) {
                  authenticate(e);
              }
          }}
      />

      <TextInputField
          type="password"
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          marginBottom={16}
          width={400}
          onKeyDown={(e) => {
              if (e.key === 'Enter' && isActive) {
                  authenticate(e);
              }
          }}
      />


      <Button 
        appearance="minimal" 
        intent="none"
        marginBottom={16} 
        onClick={() => {
          navigate('/register');
          onClose();
        }}
      >
        Don't have an account? Register here.
      </Button>

      {isActive ? (
        <Button appearance="primary" onClick={authenticate} marginRight={2} marginTop={16} >
          Submit
        </Button>
      ) : (
        <Button appearance="danger" disabled>
          Submit
        </Button>
      )}

    </Pane>
  );
}
