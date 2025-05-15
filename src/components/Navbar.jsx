import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../api/axiosConfig';

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get('/auth/session'); // Endpoint para verificar sesión
                setUser(response.data.session);
                console.log(response.data.session);
            } catch (error) {
                console.error('No active session:', error);
            }
        };

        checkSession();
    }, []);

    const handleLogout = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Estas a punto de cerrar sesión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                api.post('/auth/logout');
                setUser(null);
                Swal.fire(
                    'Sesión cerrada',
                    'Has cerrado sesión correctamente.',
                    'success'
                ).then(() => {
                    navigate('/');
                });
            }
        });
    };

    return (
        <nav className="bg-cyan-700 shadow-md px-4 py-2">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-8 mr-4" />
                    <h1 className="text-3xl font-bold text-white">Veterinaria</h1>
                </div>

                {/* Botón de menú móvil */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
                    aria-label="Toggle menu"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-white transition-transform duration-300 ease-in-out"
                    >
                        <path
                            d="M4 6h16M4 12h16M4 18h16"
                            className={`transition-all duration-300 stroke-current stroke-2 ${menuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <path
                            d="M6 6l12 12M6 18L18 6"
                            className={`transition-all duration-300 stroke-current stroke-2 ${menuOpen ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    </svg>
                </button>

                {/* Menú en desktop */}
                <div className="hidden md:flex items-center gap-6 text-xl text-white">
                    <NavLink to="/" className="hover:text-gray-200 transition">Inicio</NavLink>
                    <NavLink to="/" className="hover:text-gray-200 transition">Contacto</NavLink>
                    <NavLink to="/servicios" className="hover:text-gray-200 transition">Servicios</NavLink>
                    {user && user.rol?.nombre === "Administrador" && (
                        <NavLink to="/admin" className=" transition font-semibold">Admin</NavLink>
                    )}
                    {user && user.rol?.nombre === "Veterinario" && (
                        <NavLink to="/veterinario" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Veterinario</NavLink>
                    )}
                    {user ? (
                        <>
                            <NavLink to="/cliente" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Cuenta</NavLink>
                            <button onClick={handleLogout} className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition cursor-pointer">Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Iniciar Sesión</NavLink>
                            <NavLink to="/register" className="bg-white text-cyan-700 px-4 py-1.5 rounded-md hover:bg-gray-200 transition">Registrarse</NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* Menú móvil */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="flex flex-col gap-3 mt-2 text-white text-lg text-center">
                    <NavLink to="/" className="px-2 py-1 hover:bg-cyan-600" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
                    <NavLink to="/" className="px-2 py-1 hover:bg-cyan-600" onClick={() => setMenuOpen(false)}>Contacto</NavLink>
                    <NavLink to="/" className="px-2 py-1 hover:bg-cyan-600" onClick={() => setMenuOpen(false)}>Servicios</NavLink>
                    {user && user.rol?.nombre === "Administrador" && (
                        <NavLink to="/admin" className="px-4 py-1.5 bg-yellow-400 text-cyan-900 rounded-md w-[80%] self-center mb-1.5 font-semibold" onClick={() => setMenuOpen(false)}>Admin</NavLink>
                    )}
                    {user && user.rol?.nombre === "Veterinario" && (
                        <NavLink to="/veterinario" className="px-4 py-1.5 bg-green-300 text-cyan-900 rounded-md w-[80%] self-center mb-1.5 font-semibold" onClick={() => setMenuOpen(false)}>Veterinario</NavLink>
                    )}
                    {user ? (
                        <>
                            <NavLink to="/cliente" className="px-4 py-1.5 bg-white text-cyan-700 rounded-md w-[80%] self-center mb-1.5" onClick={() => setMenuOpen(false)}>Cuenta</NavLink>
                            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="px-4 py-1.5 bg-white text-cyan-700 rounded-md w-[80%] self-center mb-1.5">Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="px-4 py-1.5 bg-white text-cyan-700 rounded-md w-[80%] self-center mb-1.5" onClick={() => setMenuOpen(false)}>Iniciar Sesión</NavLink>
                            <NavLink to="/register" className="px-4 py-1.5 bg-white text-cyan-700 rounded-md w-[80%] self-center mb-1.5" onClick={() => setMenuOpen(false)}>Registrarse</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
