import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLodaing] = useState(true);


useEffect(()=>{
const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

if(storedUser && storedToken){
setUser(JSON.parse(storedUser))
setToken(storedToken)
}
setLodaing(false)
},[])

 const login =(data)=>{
  
  setUser(data.user)
  setToken(data.token)
  localStorage.setItem('user',JSON.stringify(data.user))
  localStorage.setItem('token',data.token)
 }


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user')
      localStorage.removeItem('token')
  };
  return (
    <AuthContext.Provider value={{ login, user, token, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
