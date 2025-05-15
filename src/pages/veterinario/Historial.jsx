import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const Historial = () => {
    const [consultas, setConsultas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtradas, setFiltradas] = useState([]);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const { data } = await api.get('/consultas');
                setConsultas(data);
                setFiltradas(data);
            } catch (error) {
                // Manejo de error
            }
        };
        fetchConsultas();
    }, []);

    useEffect(() => {
        if (!busqueda.trim()) {
            setFiltradas(consultas);
        } else {
            const b = busqueda.toLowerCase();
            setFiltradas(
                consultas.filter(c =>
                    (c.usuario?.nombre + ' ' + c.usuario?.apellido).toLowerCase().includes(b) ||
                    (c.mascota?.nombre || '').toLowerCase().includes(b) ||
                    (c.fecha_hora || '').toLowerCase().includes(b)
                )
            );
        }
    }, [busqueda, consultas]);

    // Función para formatear fecha y hora
    function formatFechaHora(fechaStr) {
        if (!fechaStr) return '';
        const fecha = new Date(fechaStr);
        const d = fecha.getDate().toString().padStart(2, '0');
        const m = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const y = fecha.getFullYear();
        let hours = fecha.getHours();
        const minutes = fecha.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 => 12
        hours = hours.toString().padStart(2, '0');
        return `${d}/${m}/${y} ${hours}:${minutes} ${ampm}`;
    }

    const handleVerMas = (consulta) => {
        Swal.fire({
            title: `Consulta #${consulta.id}`,
            html: `
                <div style="text-align:left; font-size:1.05em;">
                    <div style="margin-bottom:12px;"><b>Cliente</b><br>${consulta.usuario?.nombre || ''} ${consulta.usuario?.apellido || ''}</div>
                    <div style="margin-bottom:12px;"><b>Mascota</b><br>${consulta.mascota?.nombre || ''}</div>
                    <div style="margin-bottom:12px;"><b>Fecha/Hora</b><br>${formatFechaHora(consulta.fecha_hora)}</div>
                    <div style="margin-bottom:12px;"><b>Servicio</b><br>${consulta.servicio?.nombre || ''}</div>
                    <div style="margin-bottom:12px;"><b>Nota</b><br><pre style="white-space:pre-wrap;margin:0;font-family:inherit;">${consulta.nota || ''}</pre></div>
                </div>
            `,
            confirmButtonText: 'Cerrar',
            width: 500
        });
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar consulta?',
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
                await api.delete(`/consultas/${id}`);
                Swal.fire('Eliminado', 'La consulta ha sido eliminada', 'success');
                // Refrescar la lista
                const { data } = await api.get('/consultas');
                setConsultas(data);
            } catch (error) {
                Swal.fire('Error', error.response?.data?.msg || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl mb-8">Historial de Citas</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por cliente, mascota o fecha"
                    className="border border-gray-300 rounded-md py-2 px-4 w-96"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>
            <div className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-1.5 px-4">No. de Consulta</th>
                            <th className="py-1.5 px-4">Cliente</th>
                            <th className="py-1.5 px-4">Mascota</th>
                            <th className="py-1.5 px-4">Fecha/Hora</th>
                            <th className="py-1.5 px-4 w-65">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.length === 0 && (
                            <tr><td colSpan="5" className="text-center py-4">No hay consultas</td></tr>
                        )}
                        {filtradas.map(consulta => (
                            <tr key={consulta.id} className="border-t border-gray-300">
                                <td className="py-1.5 px-4">{consulta.id}</td>
                                <td className="py-1.5 px-4">{consulta.usuario?.nombre} {consulta.usuario?.apellido}</td>
                                <td className="py-1.5 px-4">{consulta.mascota?.nombre}</td>
                                <td className="py-1.5 px-4">{formatFechaHora(consulta.fecha_hora)}</td>
                                <td className="py-1.5 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleVerMas(consulta)}>Ver más</button>
                                    <button className="bg-red-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleEliminar(consulta.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
