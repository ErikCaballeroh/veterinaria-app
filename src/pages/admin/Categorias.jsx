import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const { data } = await api.get('/categorias');
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    const handleAddCategoria = async () => {
        const { value: nombre } = await Swal.fire({
            title: 'Agregar categoría',
            input: 'text',
            inputLabel: 'Nombre de la categoría',
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
                await api.post('/categorias', { nombre });
                Swal.fire('Categoría agregada', '', 'success');
                const { data } = await api.get('/categorias');
                setCategorias(data);
            } catch (error) {
                Swal.fire('Error al agregar categoría', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleEditCategoria = async (categoria) => {
        const { value: nombre } = await Swal.fire({
            title: 'Editar categoría',
            input: 'text',
            inputLabel: 'Nombre de la categoría',
            inputValue: categoria.nombre,
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
                await api.put(`/categorias/${categoria.id}`, { nombre });
                Swal.fire('Categoría actualizada', '', 'success');
                const { data } = await api.get('/categorias');
                setCategorias(data);
            } catch (error) {
                Swal.fire('Error al actualizar categoría', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleDeleteCategoria = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar categoría?',
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
                await api.delete(`/categorias/${id}`);
                Swal.fire('Eliminado', 'La categoría ha sido eliminada', 'success');
                const { data } = await api.get('/categorias');
                setCategorias(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Categorías</h2>
            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer" onClick={handleAddCategoria}>Agregar categoría</button>
            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Id. Categoría</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id} className="border-t border-gray-300">
                                <td className="py-2 px-4">{categoria.id}</td>
                                <td className="py-2 px-4">{categoria.nombre}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditCategoria(categoria)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteCategoria(categoria.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
