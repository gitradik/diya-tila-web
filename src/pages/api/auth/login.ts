import { signInWithEmailAndPassword as signInWithFirebase, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';
import { fbAuth } from '../../../../firebaseConfig';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
  setLoading?: (isLoading: boolean) => void,
): Promise<ApiResponse<User, FirebaseError>> => {
  try {
    if (setLoading) setLoading(true);
    const userCredential = await signInWithFirebase(fbAuth, email, password);
    if (setLoading) setLoading(false);

    const data: ApiResponseData<User> = { success: true, data: userCredential.user };

    return data;
  } catch (error) {
    if (setLoading) setLoading(false);

    const err: ApiResponseError<FirebaseError> = { success: false, error: error as FirebaseError };

    return err;
  }
};
