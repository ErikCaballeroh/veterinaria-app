import { NavLink, Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
    return (
        <main className="flex flex-col md:flex-row p-4 gap-5">
            <nav className="w-full md:w-1/5 p-4 border border-zinc-300 m-4 rounded-lg shadow-md h-fit">
                <h2 className="text-xl">Panel Admin</h2>
                <hr className="border border-zinc-300 my-3" />
                <ul className="text-zinc-800 leading-10">
                    <li><NavLink to="/admin/empleados">Empleados</NavLink></li>
                    <li><NavLink to="/admin/clientes">Clientes</NavLink></li>
                    <li><NavLink to="/admin/mascotas">Mascotas</NavLink></li>
                    <li><NavLink to="/admin/servicios">Servicios</NavLink></li>
                    <li><NavLink to="/admin/categorias">Categorias</NavLink></li>
                    <li><NavLink to="/admin/especies">Especies</NavLink></li>
                </ul>
            </nav>

            <section className="w-full md:w-4/5 p-4">
                <Outlet />
            </section>
        </main>
    )
}
