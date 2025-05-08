import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../api/axiosConfig'
import Input from '../../components/Input';
import Button from '../../components/Button';

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
                        <Input
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ej. Juan"
                            autoComplete="nombre"
                            required
                            className="mt-1 block w-full"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="apellido" className="block text-gray-800">
                            Apellido
                        </label>
                        <Input
                            id="apellido"
                            name="apellido"
                            type="text"
                            placeholder="Ej. Perez"
                            autoComplete="apellido"
                            required
                            className="mt-1 block w-full"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="correo" className="block text-gray-800">
                            Correo
                        </label>
                        <Input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="Ej. juan.perez@gmail.com"
                            autoComplete="correo"
                            required
                            className="mt-1 block w-full"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="numero" className="block text-gray-800">
                            Número de teléfono
                        </label>
                        <Input
                            id="numero"
                            name="numero"
                            type="text"
                            placeholder="Ej. 1234567890"
                            autoComplete="numero"
                            required
                            className="mt-1 block w-full"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800">
                            Contraseña
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>


                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 text-sm font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Registrando usuario...' : 'Registrarse'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}