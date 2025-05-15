import { NavLink, Outlet } from 'react-router-dom';

export const LayoutRecepcionista = () => {
    return (
        <main className="flex flex-col md:flex-row p-4 gap-5">
            <nav className="w-full md:w-1/5 p-4 border border-zinc-300 m-4 rounded-lg shadow-md h-fit">
                <h2 className="text-xl">Panel Recepcionista</h2>
                <hr className="border border-zinc-300 my-3" />
                <ul className="text-zinc-800 leading-10">
                    <li><NavLink to="/recepcionista/agendar">Agendar Cita</NavLink></li>
                    <li><NavLink to="/recepcionista/historial">Historial de citas</NavLink></li>
                </ul>
            </nav>

            <section className="w-full md:w-4/5 p-4">
                <Outlet />
            </section>
        </main>
    )
}
