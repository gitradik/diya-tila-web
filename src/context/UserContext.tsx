import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
export const useUser = (): UserContextValue => {
  return useContext(UserContext);
};

// UserProvider component to wrap around the app
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      console.log("user", user)
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
