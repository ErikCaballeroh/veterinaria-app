import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from '../pages/auth/Login';
import { Registro } from '../pages/auth/Registro';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Cliente } from '../pages/cliente/Cliente';
import { Cartillas } from '../pages/cliente/cartillas/Cartillas';
import { DetalleCartilla } from '../pages/cliente/cartillas/DetalleCartilla';
import { Citas } from '../pages/cliente/Citas';
import { LayoutAdmin } from '../pages/admin/LayoutAdmin';
import { Empleados } from '../pages/admin/Empleados';

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
                <Route path="/admin" element={<LayoutAdmin />} >
                    <Route path="empleados" element={<Empleados />} />
                    <Route path="servicios" element={<h1>Servicios</h1>} />
                    <Route path="categorias" element={<h1>Categorias</h1>} />
                    <Route path="especies" element={<h1>Especies</h1>} />
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router