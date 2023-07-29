import { signOut as signOutFirebase, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { ApiResponse, ApiResponseError } from '@/core/types/ApiResponse';
import { fbAuth } from '../../../../firebaseConfig';

export const signOut = async (
  user: User,
  setLoading?: (isLoading: boolean) => void,
): Promise<ApiResponse<User, FirebaseError>> => {
  try {
    if (setLoading) setLoading(true);
    await signOutFirebase(fbAuth);
    if (setLoading) setLoading(false);

    return { success: true, data: user };
  } catch (error) {
    if (setLoading) setLoading(false);

    const err: ApiResponseError<FirebaseError> = { success: false, error: error as FirebaseError };

    return err;
  }
};
