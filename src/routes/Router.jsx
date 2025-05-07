import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { App } from '../App'
import Login from '../pages/Auth/Login'
import { Navbar } from '../components/Navbar'

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router