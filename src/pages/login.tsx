import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { TextField, Button, Box } from '@mui/material';
import { Email, Lock, ArrowBack } from '@mui/icons-material';

import { useRouter } from 'next/router';
import { useFirebaseError } from '@/hooks/FirebaseError';
import { useUser } from '@/context/UserContext';
import { signInWithEmailAndPassword } from '@/pages/api/auth/login';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';
import { useAuthGuard } from '@/hooks/AuthGuard';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const { error, handleFirebaseError, clearFirebaseError, getErrorMessage } = useFirebaseError();
  const { loading, setLoading, setUser } = useUser();

  const handleLogin = async () => {
    const response: ApiResponse<User, FirebaseError> = await signInWithEmailAndPassword(email, password, setLoading);

    if (response.success) {
      clearFirebaseError();
      const userData: ApiResponseData<User> = response;
      setUser(userData.data);
    } else {
      const err: ApiResponseError<FirebaseError> = response;
      handleFirebaseError(err.error);
    }
  };

  useAuthGuard(`/`, true);

  return (
    <div>
      <Button
        onClick={() => router.back()}
        variant="outlined"
        sx={{ textTransform: `initial` }}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          maxWidth: `300px`,
          margin: `auto auto`,
          pt: 3,
        }}
      >
        {loading ? `Loading...` : error && <p>{getErrorMessage()}</p>}
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
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
