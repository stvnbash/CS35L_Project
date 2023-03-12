import { createContext } from 'react';

// create user context
export const UserContext = createContext({ name: null, email: null, uid: null });
