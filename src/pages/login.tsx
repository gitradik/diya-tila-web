// pages/login.tsx
import { useState } from 'react';
import axios from 'axios'; // Install axios using 'npm install axios' if not already installed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data); // Handle the response as needed (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error(error); // Handle the error response (e.g., show error message)
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
