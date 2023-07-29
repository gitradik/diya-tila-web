import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

// Custom hook to handle Firebase errors
export function useFirebaseError() {
  const [error, setError] = useState<FirebaseError | null>(null);

  const handleFirebaseError = (errorInstance: FirebaseError | null) => {
    setError(errorInstance);
  };

  const clearFirebaseError = () => {
    setError(null);
  };

  const getErrorMessage = () => {
    if (error) {
      // Check if the error code is known and map it to a user-friendly message
      const userFriendlyMessage = mapFirebaseErrorToMessage(error.code);
      return userFriendlyMessage || `An unknown error occurred`;
    }
    return null;
  };

  const mapFirebaseErrorToMessage = (errorCode: string): string | null => {
    switch (errorCode) {
      case `auth/user-not-found`:
        return `User not found. Please check your email or sign up.`;
      case `auth/wrong-password`:
        return `Incorrect password. Please try again.`;
      case `auth/invalid-email`:
        return `Invalid email format. Please enter a valid email address.`;
      case `auth/email-already-in-use`:
        return `This email is already registered. Please log in or use a different email.`;
      // Add more cases for other error codes as needed
      default:
        return null; // Return null for unknown error codes
    }
  };

  return { error, handleFirebaseError, clearFirebaseError, getErrorMessage };
}
