import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Especies = () => {
    const [especies, setEspecies] = useState([]);

    useEffect(() => {
        const fetchEspecies = async () => {
            try {
                const { data } = await api.get('/especies');
                setEspecies(data);
            } catch (error) {
                console.error('Error al obtener las especies:', error);
            }
        };
        fetchEspecies();
    }, []);

    const handleAddEspecie = async () => {
        const { value: nombre } = await Swal.fire({
            title: 'Agregar especie',
            input: 'text',
            inputLabel: 'Nombre de la especie',
            inputPlaceholder: 'Nombre',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'El nombre es obligatorio';
                }
            }
        });
        if (nombre) {
            try {
                await api.post('/especies', { nombre });
                Swal.fire('Especie agregada', '', 'success');
                const { data } = await api.get('/especies');
                setEspecies(data);
            } catch (error) {
                Swal.fire('Error al agregar especie', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleEditEspecie = async (especie) => {
        const { value: nombre } = await Swal.fire({
            title: 'Editar especie',
            input: 'text',
            inputLabel: 'Nombre de la especie',
            inputValue: especie.nombre,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'El nombre es obligatorio';
                }
            }
        });
        if (nombre) {
            try {
                await api.put(`/especies/${especie.id}`, { nombre });
                Swal.fire('Especie actualizada', '', 'success');
                const { data } = await api.get('/especies');
                setEspecies(data);
            } catch (error) {
                Swal.fire('Error al actualizar especie', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleDeleteEspecie = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar especie?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (confirm.isConfirmed) {
            try {
                await api.delete(`/especies/${id}`);
                Swal.fire('Eliminado', 'La especie ha sido eliminada', 'success');
                const { data } = await api.get('/especies');
                setEspecies(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Especies</h2>
            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer" onClick={handleAddEspecie}>Agregar especie</button>
            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Id. Especie</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especies.map((especie) => (
                            <tr key={especie.id} className="border-t border-gray-300">
                                <td className="py-2 px-4">{especie.id}</td>
                                <td className="py-2 px-4">{especie.nombre}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditEspecie(especie)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteEspecie(especie.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
