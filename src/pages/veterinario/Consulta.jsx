import { useState, useEffect } from "react"
import Input from "../../components/Input"
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

function formatDate(date) {
    let d = date.getDate().toString().padStart(2, '0');
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    let y = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'p.m' : 'a.m';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
    return `${d}/${m}/${y} ${hours}:${minutes} ${ampm}`;
}

export const Consulta = () => {
    const [clienteId, setClienteId] = useState('');
    const [clienteInfo, setClienteInfo] = useState(null);
    const [mascotas, setMascotas] = useState([]); // ahora es array
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState('');
    const [fecha, setFecha] = useState(formatDate(new Date()));
    const [error, setError] = useState('');
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [nota, setNota] = useState('');

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const { data } = await api.get('/servicios');
                setServicios(data);
            } catch (error) {
                // Puedes manejar el error si lo deseas
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
            // Obtener mascotas del usuario
            const mascotasRes = await api.get(`/mascotas/usuario/${clienteId}`);
            setMascotas(mascotasRes.data);
        } catch (err) {
            setError('Cliente no encontrado');
        }
    };

    const handleGuardarConsulta = async () => {
        // Validación de IDs numéricos y positivos
        if (!clienteId || isNaN(clienteId) || Number(clienteId) <= 0) {
            Swal.fire('ID de cliente inválido', '', 'warning');
            return;
        }
        if (!mascotaSeleccionada || isNaN(mascotaSeleccionada) || Number(mascotaSeleccionada) <= 0) {
            Swal.fire('Seleccione una mascota válida', '', 'warning');
            return;
        }
        if (!servicioSeleccionado || isNaN(servicioSeleccionado) || Number(servicioSeleccionado) <= 0) {
            Swal.fire('Seleccione un servicio válido', '', 'warning');
            return;
        }
        // Validar nota mínima
        if (!nota || nota.trim().length < 5) {
            Swal.fire('La nota debe tener al menos 5 caracteres', '', 'warning');
            return;
        }
        // Validar que cliente y mascota existan
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
            title: '¿Guardar consulta?',
            text: '¿Deseas guardar esta consulta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });
        if (confirm.isConfirmed) {
            try {
                const now = new Date();
                await api.post('/consultas/', {
                    usuario_id: Number(clienteId),
                    mascota_id: Number(mascotaSeleccionada),
                    nota,
                    fecha_hora: now.toISOString().substring(0, 10),
                    servicio_id: Number(servicioSeleccionado)
                });
                Swal.fire('Consulta guardada', '', 'success');
                setClienteId('');
                setClienteInfo(null);
                setMascotas([]);
                setMascotaSeleccionada('');
                setNota('');
                setServicioSeleccionado('');
                setFecha(formatDate(now)); // Actualiza la fecha y hora
            } catch (error) {
                Swal.fire('Error al guardar', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl">Consulta</h2>
            {error && <div className="bg-red-100 text-red-800 p-2 my-2">{error}</div>}

            <div className="flex flex-col gap-5 pr-4">
                <div className="flex mt-4 gap-8 w-full">
                    <div className="flex flex-col flex-1/4">
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

                    <div className="flex flex-col flex-1/4">
                        <label htmlFor="mascota" className="block text-gray-800">
                            Mascota
                        </label>
                        <select
                            className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                            id="mascota"
                            name="mascota"
                            value={mascotaSeleccionada}
                            onChange={e => setMascotaSeleccionada(e.target.value)}
                        >
                            <option value="">Seleccione una mascota</option>
                            {mascotas.map(mascota => (
                                <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col flex-1/4">
                        <label htmlFor="fecha" className="block text-gray-800">
                            Fecha
                        </label>
                        {fecha}
                    </div>
                </div>

                <div className="flex mt-4 gap-4 w-full">
                    <div className="flex flex-col mt-4 gap-4 w-full flex-1/5">
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
                                // Calcular edad
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

                    <div className="flex flex-col mt-4 gap-4 w-full flex-3/5">
                        <div className="flex flex-col w-full">
                            <h3 className="text-xl mb-3">Notas</h3>
                            <textarea
                                className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600"
                                rows="6"
                                placeholder="Se realizo..."
                                value={nota}
                                onChange={e => setNota(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-start">
                            <div className="">
                                <label>Servicio</label>
                                <select
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

                            <div className="">
                                <button
                                    className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer"
                                    onClick={handleGuardarConsulta}
                                >
                                    Guardar consulta
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
