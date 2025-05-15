import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Mascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [especies, setEspecies] = useState([]);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const { data } = await api.get('/mascotas');
                setMascotas(data);
            } catch (error) {
                console.error('Error al obtener las mascotas:', error);
            }
        };
        const fetchEspecies = async () => {
            try {
                const { data } = await api.get('/especies');
                setEspecies(data);
            } catch (error) {
                console.error('Error al obtener las especies:', error);
            }
        };
        fetchMascotas();
        fetchEspecies();
    }, []);

    const handleAddMascota = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar mascota',
            html:
                `<input id="swal-input-usuario" type="number" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="No. Cliente del dueño">` +
                `<input id="swal-input-nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" placeholder="Nombre">` +
                `<select id="swal-input-especie" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">` +
                especies.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('') +
                '</select>' +
                `<select id="swal-input-sexo" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">` +
                '<option value="Macho">Macho</option>' +
                '<option value="Hembra">Hembra</option>' +
                '</select>' +
                `<input id="swal-input-fecha" type="date" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const usuario_id = document.getElementById('swal-input-usuario').value;
                const nombre = document.getElementById('swal-input-nombre').value;
                const especie_id = document.getElementById('swal-input-especie').value;
                const sexo = document.getElementById('swal-input-sexo').value;
                const fecha_nacimiento = document.getElementById('swal-input-fecha').value;
                if (!usuario_id || !nombre || !especie_id || !sexo || !fecha_nacimiento) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                return { usuario_id, nombre, especie_id, sexo, fecha_nacimiento };
            }
        });
        if (formValues) {
            try {
                await api.post('/mascotas', {
                    usuario_id: formValues.usuario_id,
                    nombre: formValues.nombre,
                    especie_id: formValues.especie_id,
                    sexo: formValues.sexo,
                    fecha_nacimiento: formValues.fecha_nacimiento
                });
                Swal.fire('Mascota agregada', '', 'success');
                const { data } = await api.get('/mascotas');
                setMascotas(data);
            } catch (error) {
                Swal.fire('Error al agregar mascota', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleEditMascota = async (mascota) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar mascota',
            html:
                `<input id="swal-input-usuario" type="number" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" value="${mascota.usuario?.id || ''}" placeholder="No. Cliente del dueño">` +
                `<input id="swal-input-nombre" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" value="${mascota.nombre}" placeholder="Nombre">` +
                `<select id="swal-input-especie" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">` +
                especies.map(e => `<option value="${e.id}" ${e.id === mascota.especie.id ? 'selected' : ''}>${e.nombre}</option>`).join('') +
                '</select>' +
                `<select id="swal-input-sexo" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4">` +
                `<option value="Macho" ${mascota.sexo === 'Macho' ? 'selected' : ''}>Macho</option>` +
                `<option value="Hembra" ${mascota.sexo === 'Hembra' ? 'selected' : ''}>Hembra</option>` +
                '</select>' +
                `<input id="swal-input-fecha" type="date" class="border border-gray-300 rounded-md py-2 px-4 w-full mb-4" value="${mascota.fecha_nacimiento ? mascota.fecha_nacimiento.substring(0, 10) : ''}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const usuario_id = document.getElementById('swal-input-usuario').value;
                const nombre = document.getElementById('swal-input-nombre').value;
                const especie_id = document.getElementById('swal-input-especie').value;
                const sexo = document.getElementById('swal-input-sexo').value;
                const fecha_nacimiento = document.getElementById('swal-input-fecha').value;
                if (!usuario_id || !nombre || !especie_id || !sexo || !fecha_nacimiento) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                return { usuario_id, nombre, especie_id, sexo, fecha_nacimiento };
            }
        });
        if (formValues) {
            try {
                await api.put(`/mascotas/${mascota.id}`,
                    {
                        usuario_id: formValues.usuario_id,
                        nombre: formValues.nombre,
                        especie_id: formValues.especie_id,
                        sexo: formValues.sexo,
                        fecha_nacimiento: formValues.fecha_nacimiento
                    }
                );
                Swal.fire('Mascota actualizada', '', 'success');
                const { data } = await api.get('/mascotas');
                setMascotas(data);
            } catch (error) {
                Swal.fire('Error al actualizar mascota', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    const handleDeleteMascota = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar mascota?',
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
                await api.delete(`/mascotas/${id}`);
                Swal.fire('Eliminado', 'La mascota ha sido eliminada', 'success');
                const { data } = await api.get('/mascotas');
                setMascotas(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Mascotas</h2>
            <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer" onClick={handleAddMascota}>Agregar mascota</button>
            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Id</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Especie</th>
                            <th className="py-2 px-4">Sexo</th>
                            <th className="py-2 px-4">Fecha de nacimiento</th>
                            <th className="py-2 px-4">Dueño</th>
                            <th className="py-2 px-4 w-60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map((mascota) => (
                            <tr key={mascota.id} className="border-t border-gray-300">
                                <td className="py-2 px-4">{mascota.id}</td>
                                <td className="py-2 px-4">{mascota.nombre}</td>
                                <td className="py-2 px-4">{mascota.especie?.nombre}</td>
                                <td className="py-2 px-4">{mascota.sexo}</td>
                                <td className="py-2 px-4">{mascota.fecha_nacimiento ? mascota.fecha_nacimiento.substring(0, 10) : ''}</td>
                                <td className="py-2 px-4">{mascota.usuario?.nombre}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEditMascota(mascota)}>Editar</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleDeleteMascota(mascota.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
