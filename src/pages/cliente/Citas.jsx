import { useState, useEffect } from 'react';
import Button from './components/Button';
import Modal from '../../components/Modal';
import api from '../../api/axiosConfig';

export const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);

    useEffect(() => {
        const fetchCartillas = async () => {
            try {
                const { data } = await api.get('/me/citas');
                setCitas(data);
            } catch (error) {
                console.error('Error al obtener las cartillas:', error);
            }
        };

        fetchCartillas();
    }, []);

    const formatFecha = (fechaHora) => {
        const fecha = new Date(fechaHora);
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    };

    const formatHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: true };
        return fecha.toLocaleTimeString('es-ES', opcionesHora);
    };

    const openModal = (cita) => {
        setSelectedCita(cita);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCita(null);
    };

    return (
        <>
            <div className="flex items-center justify-center px-8 md:px-0 flex-col">
                <div className="max-w-md w-full space-y-8 py-8 px-1">
                    <div>
                        <h2 className="text-4xl text-left">
                            Proximas citas
                        </h2>
                    </div>
                </div>

                {citas.length > 0 ? (
                    citas.map((cita) => (
                        <article key={cita.id} className='max-w-md w-full p-5 border border-gray-300 rounded-md shadow-sm mb-8'>
                            <header className='mb-3'>
                                <h2 className='text-2xl mb-2'>{formatFecha(cita.fecha_hora)}</h2>
                                <span className='text-gray-600 text-xl'>
                                    {formatHora(cita.fecha_hora)}
                                </span>
                            </header>
                            <Button onClick={() => openModal(cita)}>
                                Ver detalles
                            </Button>
                        </article>
                    ))
                ) : (
                    <p>No hay citas proximamente.</p>
                )}
            </div>

            {modalVisible && selectedCita && (
                <Modal onClose={closeModal}>
                    <header>
                        <h2 className="text-2xl mb-4">Detalles de la cita</h2>
                    </header>
                    <hr className='border border-zinc-300 mb-3' />
                    <section>
                        <p className="text-xl">Fecha</p>
                        <p className="mb-4 text-zinc-800">{formatFecha(selectedCita.fecha_hora)} {formatHora(selectedCita.fecha_hora)}</p>
                        <p className="text-xl">Mascota</p>
                        <p className='mb-4 text-zinc-800'>{selectedCita.mascota.nombre || 'Sin mascota disponible'}</p>
                        <p className="text-xl">Servicio</p>
                        <p className='mb-4 text-zinc-800'>{selectedCita.servicio.nombre || 'Sin servicio'}</p>
                    </section>
                    <Button onClick={closeModal}>Cerrar</Button>
                </Modal>
            )}
        </>
    );
};
