import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import api from '../../../api/axiosConfig';

export const Cartillas = () => {
    const [cartillas, setCartillas] = useState([]);

    useEffect(() => {
        const fetchCartillas = async () => {
            try {
                const { data } = await api.get('/me/cartillas');
                setCartillas(data);
            } catch (error) {
                console.error('Error al obtener las cartillas:', error);
            }
        };

        fetchCartillas();
    }, []);

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

    const handleCartillaClick = (id) => {
        alert(`Cartilla seleccionada: ${id}`);
        // Aquí puedes agregar la lógica para manejar el clic en una cartilla
    };

    return (
        <>
            <div className="flex items-center justify-center px-8 md:px-0 flex-col">
                <div className="max-w-md w-full space-y-8 py-8 px-1">
                    <div>
                        <h2 className="text-4xl text-left">
                            Cartillas
                        </h2>
                    </div>
                </div>

                {cartillas.length > 0 ? (
                    cartillas.map((cartilla) => (
                        <div key={cartilla.id} className='max-w-md w-full p-5 border border-gray-300 rounded-md shadow-sm mb-10'>
                            <h2 className='mb-3'>
                                <span className='text-2xl mr-2'>{cartilla.nombre}</span>
                                <span className='text-gray-600 text-xl'>
                                    {cartilla.especie.nombre}, {calcularEdad(cartilla.fecha_nacimiento)} años
                                </span>
                            </h2>
                            <Button onClick={() => handleCartillaClick(cartilla.id)}>
                                Ver Cartilla
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No hay cartillas disponibles.</p>
                )}
            </div>
        </>
    );
};
