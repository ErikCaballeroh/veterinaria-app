import { useState } from "react"
import Input from "../../components/Input"

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
    const [cliente, setCliente] = useState('');
    const [mascotas, setMascotas] = useState('');
    const [fecha, setFecha] = useState(formatDate(new Date()));

    return (
        <>
            <h2 className="text-3xl">Consulta</h2>


            <div className="flex flex-col gap-5 pr-4">
                <div className="flex mt-4 gap-8 w-full">
                    <div className="flex flex-col flex-1/4">
                        <label htmlFor="email" className="block text-gray-800">
                            Cliente
                        </label>
                        <Input id="cliente"
                            name="cliente"
                            type="number"
                            placeholder="Ingrese el no. de cliente"
                            required
                            className="mt-1 block w-full"
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col flex-1/4">
                        <label htmlFor="mascota" className="block text-gray-800">
                            Mascota
                        </label>
                        <select className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600" id="mascota" name="mascota" value={mascotas} onChange={(e) => setMascotas(e.target.value)}>
                            <option value="">Seleccione una mascota</option>
                            <option value="mascota1">Mascota 1</option>
                            <option value="mascota2">Mascota 2</option>
                            <option value="mascota3">Mascota 3</option>
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
                            <p className="text-sm text-zinc-800">Nombre: Juan Perez</p>
                            <p className="text-sm text-zinc-800">Telefono: 8123324123</p>
                            <p className="text-sm text-zinc-800">Correo: juan.perez@gmail.com</p>
                        </div>
                        <div className="flex flex-col mt-4 gap-4 w-full">
                            <h3 className="text-2xl">Datos de la mascota</h3>
                            <p className="text-sm text-zinc-800">Nombre: Rocky</p>
                            <p className="text-sm text-zinc-800">Edad: 2 años</p>
                            <p className="text-sm text-zinc-800">Especie: Perro</p>
                            <p className="text-sm text-zinc-800">Sexo: Macho</p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-4 w-full flex-3/5">
                        <div className="flex flex-col w-full">
                            <h3 className="text-2xl">Motivo de la consulta</h3>
                            <textarea className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600" rows="4" placeholder="Ingrese el motivo de la consulta"></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-start">
                            <div className="">
                                <label>Servicio</label>
                                <select name="" id="" className="mt-1 block w-full border border-zinc-300 rounded-sm p-2 shadow-sm text-zinc-600">
                                    <option value="">Seleccione un servicio</option>
                                    <option value="servicio1">Servicio 1</option>
                                    <option value="servicio2">Servicio 2</option>
                                    <option value="servicio3">Servicio 3</option>
                                </select>
                            </div>

                            <div className="">
                                <button className="bg-cyan-600 text-white rounded-sm p-2 my-8 cursor-pointer">Guardar consulta</button>
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </>
    )
}
