import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Bienvenido a la Veterinaria</h1>
            <div className="mt-4 space-x-4">
                <Link to="/login" className="text-blue-600 hover:underline">
                    Iniciar sesión
                </Link>
                <Link to="/register" className="text-blue-600 hover:underline">
                    Registrarse
                </Link>
            </div>
        </div>
    )
}

export default Home