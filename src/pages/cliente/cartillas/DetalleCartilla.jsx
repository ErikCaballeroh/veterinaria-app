import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import Button from '../components/Button';
import Modal from '../../../components/Modal';

export const DetalleCartilla = () => {
    const { id } = useParams();
    const [consultas, setConsultas] = useState([]);
    const [mascota, setMascota] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const { data } = await api.get(`/mascotas/${id}`);
                setMascota(data);
            }
            catch (error) {
                console.error('Error al obtener la mascota:', error);
            }
        };

        fetchMascota();

        const fetchCitas = async () => {
            try {
                const { data } = await api.get(`/me/cartillas/mascota/${id}/consultas`);
                setConsultas(data);
            } catch (error) {
                console.error('Error al obtener la cartilla:', error);
            }
        };

        fetchCitas();
    }, [id]);

    const calcularEdad = (fechaNacimiento) => {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    const formatFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
        return `${fechaFormateada} ${horaFormateada}`;
    };

    const openModal = (consulta) => {
        setSelectedConsulta(consulta);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedConsulta(null);
    };

    if (!consultas) {
        return <p>Cargando...</p>;
    }

    return (
        <main className="flex items-center justify-center px-8 md:px-0 flex-col">
            <section className="max-w-md w-full space-y-8 py-8 px-1">
                <header>
                    <h2 className="text-4xl text-left mb-4">
                        {mascota.nombre}
                    </h2>
                    <h3 className='text-xl mb-2'>Datos de la mascota</h3>
                </header>
                <p className='text-zinc-800 leading-8'>
                    Edad: {calcularEdad(mascota.fecha_nacimiento)} años
                    <br />
                    Especie: {mascota.especie?.nombre}
                    <br />
                    Sexo: {mascota.sexo}
                </p>
            </section>

            <section className="max-w-md w-full space-y-8 mb-6 px-1">
                <header>
                    <h2 className="text-3xl text-left">
                        Historial
                    </h2>
                </header>
            </section>

            {consultas.map((consulta) => (
                <article key={consulta.id} className='max-w-md w-full p-5 border border-gray-300 rounded-md shadow-sm mb-10'>
                    <header className='mb-3'>
                        <h2 className='text-2xl mb-2'>{formatFechaHora(consulta.fecha_hora)}</h2>
                        <span className='text-gray-600 text-xl'>
                            {consulta.servicio.nombre}
                        </span>
                    </header>
                    <Button onClick={() => openModal(consulta)}>Ver mas</Button>
                </article>
            ))}

            {modalVisible && selectedConsulta && (
                <Modal onClose={closeModal}>
                    <header>
                        <h2 className="text-2xl mb-4">Consulta general</h2>
                    </header>
                    <hr className='border border-zinc-300 mb-3' />
                    <section>
                        <p className="text-xl">Fecha</p>
                        <p className="mb-4 text-zinc-800">{formatFechaHora(selectedConsulta.fecha_hora)}</p>
                        <p className="text-xl">Notas del veterinario</p>
                        <p className='mb-4 text-zinc-800'>{selectedConsulta.nota}</p>
                    </section>
                    <Button onClick={closeModal}>Cerrar</Button>
                </Modal>
            )}
        </main>
    );
};