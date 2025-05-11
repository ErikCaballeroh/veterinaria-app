import { useState, useEffect } from "react"
import { UserContext } from "./UserContext"
import api from '../api/axiosConfig';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined); // undefined = loading, null = no user
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get('/auth/session');
                setUser(response.data.session);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}
