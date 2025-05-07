import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import api from '../api/axiosConfig';

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Estas a punto de cerrar sesion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                api.post('/auth/logout')
                setUser(null);
                Swal.fire(
                    'Sesión cerrada',
                    'Has cerrado sesión correctamente.',
                    'success'
                )
            }
        })
    }

    return (
        <nav className="bg-cyan-700 shadow-md px-8 py-2">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <img src={logo} alt="" className='w-8 mr-4' />
                    <h1 className="text-4xl font-bold text-white">Veterinaria</h1>
                </div>
                <div className="flex items-center gap-10 text-2xl text-white">
                    <NavLink to="/" className="hover:text-gray-200 transition duration-300">
                        Inicio
                    </NavLink>
                    <NavLink to="/" className="hover:text-gray-200 transition duration-300">
                        Contacto
                    </NavLink>
                    <NavLink to="/" className="hover:text-gray-200 transition duration-300">
                        Servicios
                    </NavLink>
                    {user ? (
                        <div className="flex gap-4">
                            <NavLink to="/cartillas" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300">
                                Cartillas
                            </NavLink>
                            <button className="bg-white cursor-pointer text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </div>

                    ) : (
                        <div className="flex gap-4">
                            <NavLink to="/login" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300">
                                Iniciar Sesión
                            </NavLink>
                            <NavLink to="/register" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300">
                                Registrarse
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
