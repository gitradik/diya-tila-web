import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { TextField, Button } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

import { useFirebaseError } from '@/hooks/FirebaseError';
import { useUser } from '@/context/UserContext';
import { signInWithEmailAndPassword } from '@/pages/api/auth/login';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, handleFirebaseError, clearFirebaseError, getErrorMessage } = useFirebaseError();
  const { user, setUser } = useUser(); // Access the setUser function from the useUser hook

  const handleLogin = async () => {
    const response: ApiResponse<User, FirebaseError> = await signInWithEmailAndPassword(email, password);

    if (response.success) {
      clearFirebaseError(); // Clear the error if the login is successful
      const userData: ApiResponseData<User> = response;

      // Set the user data in the context using setUser
      setUser(userData.data);
    } else {
      const err: ApiResponseError<FirebaseError> = response;
      handleFirebaseError(err.error); // Handle the error response and set the error message
    }
  };

  return (
    <div>
      {JSON.stringify(user)}
      {error && <p>{getErrorMessage()}</p>}
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
