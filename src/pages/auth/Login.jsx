import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../api/axiosConfig'
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post('/auth/login', { correo: email, contrasena: password })
            setUser(response.data.user);

            // Redirigir según rol
            // switch (response.data.rol.nombre) {
            //     case 'admin':
            //         navigate('/admin')
            //         break
            //     case 'vet':
            //         navigate('/veterinarian')
            //         break
            //     case 'receptionist':
            //         navigate('/receptionist')
            //         break
            //     default:
            //         navigate('/user')
            // }
            navigate('/');

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
            <div className="max-w-md w-full space-y-8 p-8">
                <div>
                    <h2 className="text-4xl">
                        Iniciar Sesion
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-gray-800">
                            Correo
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Ingrese su correo"
                            autoComplete="email"
                            required
                            className="mt-1 block w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 text-sm font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}