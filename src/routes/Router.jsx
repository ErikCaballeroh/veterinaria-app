import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { App } from '../App'
import Login from '../pages/Auth/Login'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* Aquí irán las rutas anidadas */}
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router