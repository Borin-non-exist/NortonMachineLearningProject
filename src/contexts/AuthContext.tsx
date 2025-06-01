// Example: a simple AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: string; name: string } | null;
  login: (credentials)=>Promise<void>;
  logout: ()=>Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({ ... });
