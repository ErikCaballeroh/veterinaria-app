import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/Router'
import './index.css'
import { UserProvider } from './context/UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <Router />
        </UserProvider>
    </React.StrictMode>,
)