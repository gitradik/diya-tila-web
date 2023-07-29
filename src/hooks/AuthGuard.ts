import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

export const useAuthGuard = (redirectTo = '/login', preventAuthedUser = false): void => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && preventAuthedUser && user) {
      router.push('/'); // Redirect to the home page if the user is already authenticated and preventAuthedUser is true
    } else if (!loading && !user && !preventAuthedUser) {
      router.push(redirectTo); // Redirect to the login page if the user is not authenticated and preventAuthedUser is false
    }
  }, [user, loading, router, redirectTo, preventAuthedUser]);
};
