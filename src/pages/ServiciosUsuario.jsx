import { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';

export const ServiciosUsuario = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                setServicios([]);
            }
        };
        fetchServicios();
    }, []);

    // Agrupar servicios por categoría
    const serviciosPorCategoria = servicios.reduce((acc, servicio) => {
        const categoria = servicio.categoria?.nombre || 'Sin categoría';
        if (!acc[categoria]) acc[categoria] = [];
        acc[categoria].push(servicio);
        return acc;
    }, {});

    return (
        <>
            <main className="flex-grow flex items-center justify-center text-center px-4 bg-white my-20">
                <div className="max-w-3xl w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-800">Nuestros Servicios</h2>
                    <p className="text-lg text-gray-700 mb-10">
                        Ofrecemos una variedad de servicios veterinarios para el bienestar y salud de tus mascotas. Nuestro equipo profesional está listo para atender cualquier necesidad.
                    </p>
                    {servicios.length === 0 ? (
                        <div className="col-span-3 text-gray-500 text-center">No hay servicios disponibles.</div>
                    ) : (
                        Object.entries(serviciosPorCategoria).map(([categoria, serviciosCat]) => (
                            <div key={categoria} className="mb-10">
                                <h3 className="text-2xl font-bold text-cyan-700 mb-6 text-left">{categoria}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {serviciosCat.map(servicio => (
                                        <div key={servicio.id} className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-100 flex flex-col justify-between">
                                            <h4 className="text-xl font-bold text-cyan-800 mb-2">{servicio.nombre}</h4>
                                            <p className="text-cyan-700 font-semibold text-lg mb-2">${' '}{servicio.precio}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </>
    );
}
