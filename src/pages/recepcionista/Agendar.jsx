import { useState, useEffect } from "react"
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Agendar = () => {
    const [clienteId, setClienteId] = useState('');
    const [clienteInfo, setClienteInfo] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState('');
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                // Manejar error si se desea
            }
        };
        fetchServicios();
    }, []);

    const handleClienteBlur = async () => {
        setClienteInfo(null);
        setMascotas([]);
        setMascotaSeleccionada('');
        setError('');
        if (!clienteId) return;
        try {
            const { data } = await api.get(`/usuarios/${clienteId}`);
            setClienteInfo(data);
            const mascotasRes = await api.get(`/mascotas/usuario/${clienteId}`);
            setMascotas(mascotasRes.data);
        } catch (err) {
            setError('Cliente no encontrado');
        }
    };

    const handleAgendarCita = async (e) => {
        e.preventDefault();
        if (!clienteId || isNaN(clienteId) || Number(clienteId) <= 0) {
            Swal.fire('ID de cliente inválido', '', 'warning');
            return;
        }
        if (!mascotaSeleccionada || isNaN(mascotaSeleccionada) || Number(mascotaSeleccionada) <= 0) {
            Swal.fire('Seleccione una mascota válida', '', 'warning');
            return;
        }
        if (!fecha) {
            Swal.fire('Seleccione una fecha y hora', '', 'warning');
            return;
        }
        if (!clienteInfo) {
            Swal.fire('Debes cargar un cliente válido', '', 'warning');
            return;
        }
        const mascotaObj = mascotas.find(m => m.id === Number(mascotaSeleccionada));
        if (!mascotaObj) {
            Swal.fire('Debes seleccionar una mascota válida', '', 'warning');
            return;
        }
        const confirm = await Swal.fire({
            title: '¿Agendar cita?',
            text: '¿Deseas agendar esta cita?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, agendar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });
        if (confirm.isConfirmed) {
            try {
                await api.post('/citas/', {
                    usuario_id: Number(clienteId),
                    mascota_id: Number(mascotaSeleccionada),
                    fecha_hora: fecha,
                    servicio_id: servicioSeleccionado ? Number(servicioSeleccionado) : null
                });
                Swal.fire('Cita agendada', '', 'success');
                setClienteId('');
                setClienteInfo(null);
                setMascotas([]);
                setMascotaSeleccionada('');
                setServicioSeleccionado('');
                setFecha('');
            } catch (error) {
                Swal.fire('Error al agendar', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Agendar cita</h2>
            {error && <div className="bg-red-100 text-red-800 p-2 my-2">{error}</div>}
            <form onSubmit={handleAgendarCita}>
                <div className="grid grid-cols-2 gap-10 pr-4 w-200">
                    <div className="flex flex-col mt-4 gap-4 w-full">
                        <div className="">
                            <label htmlFor="clienteId" className="block text-gray-800">
                                Cliente
                            </label>
                            <input
                                id="clienteId"
                                name="clienteId"
                                type="number"
                                placeholder="Ingrese el no. de cliente"
                                required
                                className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                                value={clienteId}
                                onChange={e => setClienteId(e.target.value)}
                                onBlur={handleClienteBlur}
                            />
                        </div>

                        <div className="flex flex-col mt-4 gap-4 w-full">
                            <h3 className="text-2xl">Datos del cliente</h3>
                            <p className="text-sm text-zinc-800">Nombre: {clienteInfo ? `${clienteInfo.nombre} ${clienteInfo.apellido}` : ''}</p>
                            <p className="text-sm text-zinc-800">Telefono: {clienteInfo ? clienteInfo.numero : ''}</p>
                            <p className="text-sm text-zinc-800">Correo: {clienteInfo ? clienteInfo.correo : ''}</p>
                        </div>
                        <div className="flex flex-col mt-4 gap-4 w-full">
                            <h3 className="text-2xl">Datos de la mascota</h3>
                            {(() => {
                                const mascota = mascotas.find(m => m.id === Number(mascotaSeleccionada));
                                if (!mascota) return (
                                    <>
                                        <p className="text-sm text-zinc-800">Nombre: </p>
                                        <p className="text-sm text-zinc-800">Edad: </p>
                                        <p className="text-sm text-zinc-800">Especie: </p>
                                        <p className="text-sm text-zinc-800">Sexo: </p>
                                    </>
                                );
                                let edad = '';
                                if (mascota.fecha_nacimiento) {
                                    const nacimiento = new Date(mascota.fecha_nacimiento);
                                    const hoy = new Date();
                                    let anios = hoy.getFullYear() - nacimiento.getFullYear();
                                    let m = hoy.getMonth() - nacimiento.getMonth();
                                    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                                        anios--;
                                    }
                                    edad = anios === 1 ? '1 año' : `${anios} años`;
                                }
                                return (
                                    <>
                                        <p className="text-sm text-zinc-800">Nombre: {mascota.nombre}</p>
                                        <p className="text-sm text-zinc-800">Edad: {edad}</p>
                                        <p className="text-sm text-zinc-800">Especie: {mascota.especie?.nombre || ''}</p>
                                        <p className="text-sm text-zinc-800">Sexo: {mascota.sexo}</p>
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-4 w-full col-span-1">
                        <div className="mb-3">
                            <label htmlFor="mascotaId" className="block text-gray-800">
                                Mascota
                            </label>
                            <select
                                id="mascotaId"
                                name="mascotaId"
                                required
                                className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                                value={mascotaSeleccionada}
                                onChange={e => setMascotaSeleccionada(e.target.value)}
                            >
                                <option value="">Seleccione una mascota</option>
                                {mascotas.map(mascota => (
                                    <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="servicioId" className="block text-gray-800">
                                Servicio
                            </label>
                            <select
                                id="servicioId"
                                name="servicioId"
                                className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                                value={servicioSeleccionado}
                                onChange={e => setServicioSeleccionado(e.target.value)}
                            >
                                <option value="">Seleccione un servicio</option>
                                {servicios.map(servicio => (
                                    <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fecha" className="block text-gray-800">
                                Fecha y hora
                            </label>
                            <input
                                id="fecha"
                                name="fecha"
                                type="datetime-local"
                                required
                                className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-200"
                            >
                                Agendar cita
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}
