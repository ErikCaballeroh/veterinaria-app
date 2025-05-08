import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from '../pages/auth/Login';
import { Registro } from '../pages/auth/Registro';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Cliente } from '../pages/cliente/Cliente';

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registro />} />
                <Route path="/cliente" element={<Cliente />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router