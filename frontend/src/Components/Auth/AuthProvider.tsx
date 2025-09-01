import { createContext, useEffect, useState, type PropsWithChildren } from "react"; 
import {BACKEND_URL} from '../../Utils/constants.ts'
import { getRequest } from "../../Utils/requests.ts";

type AuthContextType = {
    isLoggedIn: boolean;
    email: string;
    uname: string;
    loading: boolean;
    login: (email: string)=>void;
    logout: ()=> void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    email: "",
    uname: "",
    loading: true,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkAuth = async ()=>{
            try{
                const res = await getRequest(`${BACKEND_URL}/user`);
                if(res && res.email){
                    setIsLoggedIn(true);
                    setEmail(res.email);
                    setUname(res.username);
                } else {
                    setIsLoggedIn(false);
                    setEmail("");
                }
            } catch(err){
                console.log(err);
                setIsLoggedIn(false);
                setEmail("");
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = (email: string) => {
        setIsLoggedIn(true);
        setEmail(email);
    }
    
    const logout = ()=>{
        setIsLoggedIn(false);
        setEmail("");
    }

  return (
    <AuthContext.Provider value={{isLoggedIn, email, uname, loading, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider