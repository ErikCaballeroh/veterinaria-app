import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig.js';
import Swal from 'sweetalert2';

export const HistorialCitas = () => {
    const [citas, setCitas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtradas, setFiltradas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const { data } = await api.get('/citas');
                setCitas(data);
                setFiltradas(data);
            } catch (error) {
                // Manejo de error
            }
        };
        fetchCitas();
    }, []);

    useEffect(() => {
        if (!busqueda.trim()) {
            setFiltradas(citas);
        } else {
            const b = busqueda.toLowerCase();
            setFiltradas(
                citas.filter(c =>
                    (c.usuario?.nombre || '').toLowerCase().includes(b) ||
                    (c.mascota?.nombre || '').toLowerCase().includes(b) ||
                    (c.fecha_hora || '').toLowerCase().includes(b)
                )
            );
        }
    }, [busqueda, citas]);

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
        hours = hours ? hours : 12;
        hours = hours.toString().padStart(2, '0');
        return `${d}/${m}/${y} ${hours}:${minutes} ${ampm}`;
    }

    const handleVerMas = (cita) => {
        Swal.fire({
            title: `Cita #${cita.id}`,
            html: `
                <div style="text-align:left; font-size:1.05em;">
                    <div style="margin-bottom:12px;"><b>Cliente</b><br>${cita.usuario?.nombre || ''}</div>
                    <div style="margin-bottom:12px;"><b>Mascota</b><br>${cita.mascota?.nombre || ''}</div>
                    <div style="margin-bottom:12px;"><b>Fecha/Hora</b><br>${formatFechaHora(cita.fecha_hora)}</div>
                    <div style="margin-bottom:12px;"><b>Servicio</b><br>${cita.servicio?.nombre || ''}</div>
                </div>
            `,
            confirmButtonText: 'Cerrar',
            width: 500
        });
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
                            <th className="py-1.5 px-4">No. de Cita</th>
                            <th className="py-1.5 px-4">Cliente</th>
                            <th className="py-1.5 px-4">Mascota</th>
                            <th className="py-1.5 px-4">Fecha/Hora</th>
                            <th className="py-1.5 px-4 w-65">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.length === 0 && (
                            <tr><td colSpan="5" className="text-center py-4">No hay citas</td></tr>
                        )}
                        {filtradas.map(cita => (
                            <tr key={cita.id} className="border-t border-gray-300">
                                <td className="py-1.5 px-4">{cita.id}</td>
                                <td className="py-1.5 px-4">{cita.usuario?.nombre}</td>
                                <td className="py-1.5 px-4">{cita.mascota?.nombre}</td>
                                <td className="py-1.5 px-4">{formatFechaHora(cita.fecha_hora)}</td>
                                <td className="py-1.5 px-4 flex gap-2">
                                    <button className="bg-cyan-600 text-white rounded-full px-6 py-1.5 cursor-pointer" onClick={() => handleVerMas(cita)}>Ver más</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
