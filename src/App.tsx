import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import AuthProvider from "./context/AuthContext";
import { useAuth } from './hooks/useAuth';
import { UserDisplayDto } from './models/userDtos';

const HomePage = lazy(() => import("./components/HomePage"));

function ProtectedRoute() {
    const currentUser: UserDisplayDto | null = useAuth();
    return (
        currentUser ? (
            <Suspense fallback={<LoadingComponent />}>
                <HomePage />
            </Suspense>
        ) : (
            <Navigate to="/login" />
        )
    );
}

export default function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<SignInForm />} />
                        <Route path="/" element={<ProtectedRoute />} />
                        <Route path="/register" element={<SignUpForm />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}