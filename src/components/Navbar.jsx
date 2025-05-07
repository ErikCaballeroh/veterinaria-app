import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'

export const Navbar = () => {
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
                    <div className="flex gap-4">
                        <NavLink to="/login" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300">
                            Iniciar Sesión
                        </NavLink>
                        <NavLink to="/register" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition duration-300">
                            Registrarse
                        </NavLink>
                    </div>

                </div>
            </div>
        </nav>
    )
}
