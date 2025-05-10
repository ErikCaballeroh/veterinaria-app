import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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

    const handleAddEmpleado = async () => {
        Swal.fire({
            html: `
                <h2 class="text-3xl mb-2 text-left">Actualizar puesto</h2>
                <p class="text-sm text-gray-500 mb-4 text-left">Puedes agregar un nuevo empleado al actualizar el puesto de una cuenta de cliente</p>
                <input id="usuario" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Id. Usuario">
                <select id="rol" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">
                    <option selected value="0">Selecciona un puesto</option>
                    <option value="1">Administrador</option>
                    <option value="2">Veterinario</option>
                    <option value="3">Recepcionista</option>
                </select>
            `,
            confirmButtonText: 'Agregar',
            confirmButtonColor: '#3085d6',
            focusConfirm: false,
            preConfirm: () => {
                const id = Number(document.getElementById('usuario').value);
                const rol_id = Number(document.getElementById('rol').value);
                if (!id || !rol_id) {
                    Swal.showValidationMessage('Completa todos los campos');
                    return false;
                }
                return { id, rol_id };
            }
        }).then(async (result) => {
            if (result.isConfirmed && result.value) {
                try {
                    await api.put(`usuarios/empleados/${result.value.id}`, { rol_id: result.value.rol_id });
                    Swal.fire('Puesto actualizado', '', 'success');
                    // Refrescar la lista de empleados
                    const { data } = await api.get('/usuarios/empleados');
                    setEmpleados(data);
                } catch (error) {
                    Swal.fire('Error al agregar empleado', error.response?.data?.msg || 'Error desconocido', 'error');
                }
            }
        })
    }

    const handleDeleteEmpleado = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar empleado?',
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
                Swal.fire('Eliminado', 'El empleado ha sido eliminado', 'success');
                // Refrescar la lista de empleados
                const { data } = await api.get('/usuarios/empleados');
                setEmpleados(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    }

    const handleEditEmpleado = async (empleado) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar empleado',
            html:
                `<input id="swal-nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nombre" value="${empleado.nombre || ''}">
                <input id="swal-apellido" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Apellido" value="${empleado.apellido || ''}">
                <input id="swal-correo" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Correo" value="${empleado.correo || ''}">
                <input id="swal-numero" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Número" value="${empleado.numero || ''}">
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
                await api.put(`/usuarios/${empleado.id}`, body);
                Swal.fire('Empleado actualizado', '', 'success');
                // Refrescar la lista de empleados
                const { data } = await api.get('/usuarios/empleados');
                setEmpleados(data);
            } catch (error) {
                Swal.fire('Error al actualizar empleado', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Empleados</h2>

            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer" onClick={handleAddEmpleado}>Actualizar puesto</button>

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
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditEmpleado(empleado)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteEmpleado(empleado.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
