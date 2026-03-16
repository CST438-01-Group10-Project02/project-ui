console.log("APP FILE LOADED");

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";

function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/sign-in" replace />;
}

export default function App() {
  const [token, setToken] = useState(() => {
    const stored = sessionStorage.getItem("token");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={token ? <Navigate to="/dashboard" replace /> : <SignIn setToken={setToken} />}
        />
        <Route
          path="/sign-up"
          element={token ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute token={token}>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/new"
          element={
            <ProtectedRoute token={token}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/sign-in"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}