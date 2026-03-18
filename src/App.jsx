import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Events from "./pages/Events.tsx";
import EventPage from "./pages/components/EventPage.tsx";
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
                <Route path="/events" element={<Events/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/events/:id" element={<EventPage/>}/>
                {token?<Route path="/dashboard" element={<Dashboard/>}/>:""}
            </Routes>
        </BrowserRouter>
    );
}