import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    const authData = useContext(AuthContext);
    return authData;
};