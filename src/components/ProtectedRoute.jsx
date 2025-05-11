import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProtectedRoute = ({ roles, children }) => {
    const { user } = useContext(UserContext);

    if (user === undefined) {
        // Esperando respuesta de la API
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-cyan-700 border-solid mb-4"></div>
                <span className="text-cyan-700 text-lg font-semibold">Cargando...</span>
            </div>
        );
    }

    if (!user) {
        // No autenticado
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.rol?.nombre)) {
        // No tiene el rol requerido
        return <h1>Acceso denegado</h1>;
    }

    return children;
};
