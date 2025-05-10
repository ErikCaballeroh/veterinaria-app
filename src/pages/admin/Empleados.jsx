import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig.js';

export const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const { data } = await api.get('/usuarios/empleados');
                setEmpleados(data);
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            }
        };

        fetchEmpleados();
    }, []);


    return (
        <>
            <h2 className="text-3xl">Empleados</h2>

            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer">Agregar empleado</button>

            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">No. Empleado</th>
                            <th className="p-2">Puesto</th>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Apellido</th>
                            <th className="p-2">Correo</th>
                            <th className="p-2">Numero</th>
                            <th className="p-2 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado.id} className="border-t border-gray-300">
                                <td className="p-2">{empleado.id}</td>
                                <td className="p-2">{empleado.rol.nombre}</td>
                                <td className="p-2">{empleado.nombre}</td>
                                <td className="p-2">{empleado.apellido}</td>
                                <td className="p-2">{empleado.correo}</td>
                                <td className="p-2">{empleado.numero}</td>
                                <td className="p-2 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer">Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    )
}
