import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import petCartillas from '../../assets/pet-cartillas.svg';
import citas from '../../assets/citas.svg';
import { NavLink } from 'react-router-dom';

export const Cliente = () => {
    const { user } = useContext(UserContext);
    const { nombre, apellido } = user || { nombre: '', apellido: '' };
    const message = `Bienvenido, ${nombre} ${apellido}`;

    return (
        <>
            <div className="flex items-center justify-center px-8 md:px-0 flex-col">
                <div className="max-w-md w-full space-y-8 py-8 px-1">
                    <div>
                        <h2 className="text-4xl text-left">
                            {message}
                        </h2>
                    </div>
                </div>

                <NavLink to='/cartillas' className='max-w-md w-full py-5 px-10 border border-gray-300 rounded-md shadow-sm mb-10'>
                    <img src={petCartillas} alt="Pet Cartillas" />
                    <h2 className="text-2xl text-center">
                        Cartillas
                    </h2>
                </NavLink>

                <NavLink to='/citas' className='max-w-md w-full py-5 px-10 border border-gray-300 rounded-md shadow-sm mb-10'>
                    <img src={citas} alt="Pet Cartillas" />
                    <h2 className="text-2xl text-center">
                        Citas
                    </h2>
                </NavLink>
            </div>
        </>
    );
};
