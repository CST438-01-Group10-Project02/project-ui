import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import {useEffect, useState} from "react";

export default function App()  {

    const [token, setToken] = useState(() => {
        const stored = sessionStorage.getItem('token')
        return stored ? JSON.parse(stored) : false
    })

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', JSON.stringify(token))
        } else {
            sessionStorage.removeItem('token')
        }
    }, [token])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/sign-in" replace/>}/>
                <Route path="/sign-in" element={<SignIn setToken={setToken}/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                {token?<Route path="/dashboard" element={<Dashboard/>}/>:""}
            </Routes>
        </BrowserRouter>
    );
}