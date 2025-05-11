import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProtectedRoute = ({ roles, children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading || user === undefined) {
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
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="text-red-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-red-700 mb-2">Acceso denegado</h1>
                <p className="text-gray-700 text-center max-w-xs">No tienes permisos para acceder a esta sección. Si crees que es un error, contacta al administrador.</p>
            </div>
        );
    }

    return children;
};
