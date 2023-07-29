import { useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { TextField, Button } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

import { useFirebaseError } from '@/hooks/FirebaseError';
import { signInWithEmailAndPassword } from '@/pages/api/auth/login';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';
import { FirebaseError } from 'firebase/app';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, handleFirebaseError, clearFirebaseError, getErrorMessage } = useFirebaseError();

  const handleLogin = async () => {
      const response: ApiResponse<UserCredential, FirebaseError> = await signInWithEmailAndPassword(email, password);
      
      if (response.success) {
        clearFirebaseError(); // Clear the error if the login is successful
        const data: ApiResponseData<UserCredential> = response
        console.log("data: ", data)
      } else {
        const err: ApiResponseError<FirebaseError> = response
        handleFirebaseError(err.error); // Handle the error response and set the error message
      }
  };

  return (
    <div>
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
