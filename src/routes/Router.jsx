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
import { Servicios } from '../pages/admin/Servicios';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Categorias } from '../pages/admin/Categorias';
import { Especies } from '../pages/admin/Especies';
import NotFound from '../pages/NotFound';

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
                <Route path="/admin" element={
                    <ProtectedRoute roles={["Administrador"]}>
                        <LayoutAdmin />
                    </ProtectedRoute>
                } >
                    <Route path="empleados" element={<Empleados />} />
                    <Route path="servicios" element={<Servicios />} />
                    <Route path="categorias" element={<Categorias />} />
                    <Route path="especies" element={<Especies />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router