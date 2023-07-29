import { createContext, useContext, useState, ReactNode } from 'react';

// Define the properties for the User
interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
}

// Create a default user object with initial values
const defaultUser: User = {
  displayName: null,
  email: null,
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  uid: '',
};

// Create the context
const UserContext = createContext<{ user: User; setUser: (user: User) => void }>({
  user: defaultUser,
  setUser: () => {},
});

// Custom hook to access the user data and setUser function
export const useUser = (): { user: User; setUser: (user: User) => void } => {
  return useContext(UserContext);
};

// UserProvider component to wrap around the app
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
