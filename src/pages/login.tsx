import { useState } from 'react';
import axios from 'axios'; // Install axios using 'npm install axios' if not already installed
import { TextField, Button } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

function LoginPage() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`/api/login`, { email, password });
      console.log(response.data); // Handle the response as needed (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error(error); // Handle the error response (e.g., show error message)
    }
  };

  return (
    <div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <Email />,
        }}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <Lock />,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
