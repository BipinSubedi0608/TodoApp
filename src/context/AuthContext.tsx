import { createContext, useEffect, useState } from "react";
import { UserDisplayDto } from "../models/userDtos";
import { User, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { mapFromFirebaseUser } from "../utils/userMapper";

export const AuthContext = createContext<UserDisplayDto | null>(null);

export default function AuthProvider({ children }: any) {
    const [currentUser, setCurrentUser] = useState<UserDisplayDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const rememberMe: boolean = localStorage.getItem('remember') === 'true';
        setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, async (user: User | null): Promise<void> => {
                    if (user) {
                        const userDisplayData: UserDisplayDto = mapFromFirebaseUser(user);
                        setCurrentUser({ ...userDisplayData });
                    } else {
                        setCurrentUser(null);
                    }
                });

                return () => unsubscribe();
            })
            .catch((error) => {
                console.error('Error setting persistence:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    );
}