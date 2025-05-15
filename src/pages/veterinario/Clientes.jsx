import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/axiosConfig.js';

export const Clientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const { data } = await api.get('/usuarios/clientes');
                setClientes(data);
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };
        fetchClientes();
    }, []);

    const handleDeleteCliente = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar cliente?',
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
                await api.delete(`/usuarios/${id}`);
                Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
                // Refrescar la lista de clientes
                const { data } = await api.get('/usuarios/clientes');
                setClientes(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleEditCliente = async (cliente) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar cliente',
            html:
                `<input id="swal-nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nombre" value="${cliente.nombre || ''}">
                <input id="swal-apellido" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Apellido" value="${cliente.apellido || ''}">
                <input id="swal-correo" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Correo" value="${cliente.correo || ''}">
                <input id="swal-numero" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Número" value="${cliente.numero || ''}">
                <input id="swal-contrasena" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nueva contraseña (opcional)" type="password">`,
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
                const apellido = document.getElementById('swal-apellido').value.trim();
                const correo = document.getElementById('swal-correo').value.trim();
                const numero = document.getElementById('swal-numero').value.trim();
                const contrasena = document.getElementById('swal-contrasena').value;
                if (!nombre || !apellido || !correo || !numero) {
                    Swal.showValidationMessage('Completa todos los campos obligatorios');
                    return false;
                }
                return { nombre, apellido, correo, numero, contrasena };
            }
        });
        if (formValues) {
            try {
                const body = {
                    nombre: formValues.nombre,
                    apellido: formValues.apellido,
                    correo: formValues.correo,
                    numero: formValues.numero
                };
                if (formValues.contrasena) {
                    body.contrasena = formValues.contrasena;
                }
                await api.put(`/usuarios/${cliente.id}`, body);
                Swal.fire('Cliente actualizado', '', 'success');
                // Refrescar la lista de clientes
                const { data } = await api.get('/usuarios/clientes');
                setClientes(data);
            } catch (error) {
                Swal.fire('Error al actualizar cliente', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl mb-8">Clientes</h2>

            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">No. Cliente</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Apellido</th>
                            <th className="py-2 px-4">Correo</th>
                            <th className="py-2 px-4">Numero</th>
                            <th className="py-2 px-4 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} className="border-t border-gray-300">
                                <td className="py-2 px-4">{cliente.id}</td>
                                <td className="py-2 px-4">{cliente.nombre}</td>
                                <td className="py-2 px-4">{cliente.apellido}</td>
                                <td className="py-2 px-4">{cliente.correo}</td>
                                <td className="py-2 px-4">{cliente.numero}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditCliente(cliente)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
