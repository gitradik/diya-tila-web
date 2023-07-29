import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { fbAuth } from '@/../firebaseConfig';

// Define the properties for the User
interface UserContextValue {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (value: boolean) => void;
}

// Create the context
const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
  setUser: () => {},
  setLoading: () => {},
});

// Custom hook to access the user data and setUser function
export const useUser = (): UserContextValue => useContext(UserContext);

// UserProvider component to wrap around the app
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Use useMemo to prevent the context value from changing on every render
  const contextValue = useMemo(() => ({ user, loading, setUser, setLoading }), [user, loading]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
