import { signInWithEmailAndPassword as signInWithFirebase, User } from 'firebase/auth';
import { fbAuth } from '../../../../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<ApiResponse<User, FirebaseError>> => {
  try {
    const userCredential = await signInWithFirebase(fbAuth, email, password);
    const data: ApiResponseData<User> = { success: true, data: userCredential.user };

    return data;
  } catch (error) {
    const err: ApiResponseError<FirebaseError> = { success: false, error: error as FirebaseError };

    return err;
  }
};
