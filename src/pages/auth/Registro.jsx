import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../api/axiosConfig'

export const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [numero, setNumero] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post('/auth/register', { nombre, apellido, correo, numero, contrasena })

            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Ahora puedes iniciar sesión'
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al iniciar sesión'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="max-w-md w-full space-y-8 p-8 ">
                <div>
                    <h2 className="text-4xl">
                        Registrate
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre" className="block text-gray-800">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="nombre"
                            placeholder="Ej. Juan"
                            autoComplete="nombre"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="apellido" className="block text-gray-800">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            name="apellido"
                            type="apellido"
                            placeholder="Ej. Perez"
                            autoComplete="apellido"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="correo" className="block text-gray-800">
                            Correo
                        </label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="Ej. juan.perez@gmail.com"
                            autoComplete="correo"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="numero" className="block text-gray-800">
                            Número de teléfono
                        </label>
                        <input
                            id="numero"
                            name="numero"
                            type="text"
                            placeholder="Ej. 1234567890"
                            autoComplete="numero"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Ingrese su conraseña"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>


                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center hover:cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Registrando usuario...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}