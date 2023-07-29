import { signInWithEmailAndPassword as signInWithFirebase, UserCredential } from 'firebase/auth';
import { fbAuth } from '../../../../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { ApiResponse, ApiResponseData, ApiResponseError } from '@/core/types/ApiResponse';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<ApiResponse<UserCredential, FirebaseError>> => {
  try {
    const userCredential = await signInWithFirebase(fbAuth, email, password);
    const data: ApiResponseData<UserCredential> = { success: true, data: userCredential };
    console.log("signInWithEmailAndPassword data", data)
    return data;
  } catch (error) {
    const err: ApiResponseError<FirebaseError> = { success: false, error: error as FirebaseError };
    console.log("signInWithEmailAndPassword err", err)
    return err;
  }
};
