import { createContext, useContext } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

type ContextType = {
    id: number;
};

interface Props {
    children: React.ReactNode;
}


export const AuthContext = createContext<ContextType>({
    id: 0,
});

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const value = {
        id: 0,
    };

    const sighUp = async (email: string, password: string) => (
        createUserWithEmailAndPassword(auth, email, password)
    )

    


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 
 
export const useAuth = () => (
    useContext(AuthContext)
);
