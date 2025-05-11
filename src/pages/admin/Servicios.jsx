import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Servicios = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        fetchServicios();
    }, [])

    const handleAddServicio = async () => {
        const { data } = await api.get('/categorias');
        const categorias = data.map(categoria => `<option value="${categoria.id}">${categoria.nombre}</option>`).join('');

        Swal.fire({
            html: `
                <h2 class="text-3xl mb-8 text-left">Agregar servicio</h2>
                <input id="nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nombre del servicio">
                <input id="precio" type="number" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Precio">
                <select id="categoria" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">
                    <option selected value="0">Selecciona una categoria</option>
                    ${categorias}
                </select>
            `,
            confirmButtonText: 'Agregar',
            confirmButtonColor: '#3085d6',
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const precio = Number(document.getElementById('precio').value);
                const categoria_id = Number(document.getElementById('categoria').value);
                if (!nombre || !precio || !categoria_id) {
                    Swal.showValidationMessage('Completa todos los campos');
                    return false;
                }
                return { nombre, precio, categoria_id };
            }
        }).then(async (result) => {
            if (result.isConfirmed && result.value) {
                try {
                    await api.post('/servicios', result.value);
                    Swal.fire('Servicio agregado', '', 'success');
                    // Refrescar la lista de servicios
                    const { data } = await api.get('/servicios');
                    setServicios(data);
                } catch (error) {
                    Swal.fire('Error al agregar servicio', error.response?.data?.msg || 'Error desconocido', 'error');
                }
            }
        })
    }

    const handleEditServicio = async (servicio) => {
        const { data } = await api.get('/categorias');
        const categorias = data.map(categoria => `<option value="${categoria.id}" ${servicio.categoria.id === categoria.id ? 'selected' : ''}>${categoria.nombre}</option>`).join('');

        const { value: formValues } = await Swal.fire({
            title: 'Editar servicio',
            html: `
                <input id="swal-nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nombre del servicio" value="${servicio.nombre || ''}">
                <input id="swal-precio" type="number" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Precio" value="${servicio.precio || ''}">
                <select id="swal-categoria" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">
                    <option value="0">Selecciona una categoria</option>
                    ${categorias}
                </select>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'swal2-confirm bg-cyan-600 text-white px-4 py-2 mx-2 rounded hover:bg-cyan-700 cursor-pointer',
                cancelButton: 'swal2-cancel bg-gray-400 text-white px-4 py-2 mx-2 rounded hover:bg-gray-500 cursor-pointer',
            },
            buttonsStyling: false,
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value.trim();
                const precio = Number(document.getElementById('swal-precio').value);
                const categoria_id = Number(document.getElementById('swal-categoria').value);
                if (!nombre || !precio || !categoria_id) {
                    Swal.showValidationMessage('Completa todos los campos');
                    return false;
                }
                return { nombre, precio, categoria_id };
            }
        });
        if (formValues) {
            try {
                await api.put(`/servicios/${servicio.id}`, formValues);
                Swal.fire('Servicio actualizado', '', 'success');
                // Refrescar la lista de servicios
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                Swal.fire('Error al actualizar servicio', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleDeleteServicio = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar servicio?',
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
                await api.delete(`/servicios/${id}`);
                Swal.fire('Eliminado', 'El servicio ha sido eliminado', 'success');
                // Refrescar la lista de servicios
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Servicios</h2>

            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer" onClick={handleAddServicio}>Agregar servicio</button>

            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Id. Servicio</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Precio</th>
                            <th className="py-2 px-4">Categoria</th>
                            <th className="py-2 px-4 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.id} className="border-t border-gray-300">
                                <td className="py-2 px-4">{servicio.id}</td>
                                <td className="py-2 px-4">{servicio.nombre}</td>
                                <td className="py-2 px-4">$ {servicio.precio}</td>
                                <td className="py-2 px-4">{servicio.categoria.nombre}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditServicio(servicio)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteServicio(servicio.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
