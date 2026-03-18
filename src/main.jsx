import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientId = "529973095137-jfvc9lte49et6cnufi7agse38knom8bq.apps.googleusercontent.com";


createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
  // </StrictMode>,
)
