import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Cartillas } from '../pages/cliente/cartillas/Cartillas';
import { Categorias } from '../pages/admin/Categorias';
import { Citas } from '../pages/cliente/Citas';
import { Cliente } from '../pages/cliente/Cliente';
import { Clientes } from '../pages/veterinario/Clientes';
import { Consulta } from '../pages/veterinario/Consulta';
import { DetalleCartilla } from '../pages/cliente/cartillas/DetalleCartilla';
import { Empleados } from '../pages/admin/Empleados';
import { Especies } from '../pages/admin/Especies';
import { Home } from '../pages/Home';
import { LayoutAdmin } from '../pages/admin/LayoutAdmin';
import { LayoutVeterinario } from '../pages/veterinario/LayoutVeterinario';
import { Login } from '../pages/auth/Login';
import { Navbar } from '../components/Navbar';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Registro } from '../pages/auth/Registro';
import { Servicios } from '../pages/admin/Servicios';
import NotFound from '../pages/NotFound';
import { Mascotas } from '../pages/veterinario/Mascotas';
import { Historial } from '../pages/veterinario/Historial';
import { ServiciosUsuario } from '../pages/ServiciosUsuario';
import { LayoutRecepcionista } from '../pages/recepcionista/LayoutRecepcionista';
import { Agendar } from '../pages/recepcionista/Agendar';

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<ServiciosUsuario />} />
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
                <Route path="/veterinario" element={
                    <ProtectedRoute roles={["Veterinario"]}>
                        <LayoutVeterinario />
                    </ProtectedRoute>
                } >
                    <Route path="iniciar-consulta" element={<Consulta />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="mascotas" element={<Mascotas />} />
                    <Route path="historial" element={<Historial />} />
                </Route>
                <Route path="/recepcionista" element={
                    <ProtectedRoute roles={["Recepcionista"]}>
                        <LayoutRecepcionista />
                    </ProtectedRoute>
                } >
                    <Route path="agendar" element={<Agendar />} />
                    <Route path="historial" element={<div>Historial de citas</div>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router