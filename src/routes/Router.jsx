import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from '../pages/auth/Login';
import { Registro } from '../pages/auth/Registro';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Cliente } from '../pages/cliente/Cliente';
import { Cartillas } from '../pages/cliente/cartillas/Cartillas';
import { DetalleCartilla } from '../pages/cliente/cartillas/DetalleCartilla';
import { Citas } from '../pages/cliente/Citas';

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registro />} />
                <Route path="/cliente" element={<Cliente />} />
                <Route path="/cliente/cartillas" element={<Cartillas />} />
                <Route path="/cliente/cartillas/:id" element={<DetalleCartilla />} />
                <Route path="/cliente/citas" element={<Citas />} />
            </Routes>

        </BrowserRouter>
    )
}

export default Router