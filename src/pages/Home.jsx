import { UserContext } from "../context/UserContext"
import { useContext } from "react"

export const Home = () => {
    const { user } = useContext(UserContext)
    const { nombre, apellido } = user || { nombre: '', apellido: '' }

    return (
        <>
            <main className="flex-grow flex items-center justify-center text-center px-4 bg-white my-40">
                <div className="max-w-2xl py-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-800">
                        Bienvenido a la Veterinaria {nombre} {apellido}
                    </h2>
                    <p className="text-xl text-gray-700 mb-8">
                        Atención médica profesional y cariño para tus mascotas. Nuestro equipo está listo para cuidar
                        a tu compañero peludo como se merece.
                    </p>
                    <a
                        href="#contacto"
                        className="inline-block bg-cyan-800 text-white px-8 py-4 rounded-full text-xl hover:bg-cyan-900 transition"
                    >
                        Agendar cita
                    </a>
                </div>
            </main>

            <section className="bg-gray-100 py-30 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-cyan-800 mb-4">Consulta General</h3>
                        <p className="text-lg text-gray-700">Ofrecemos consultas generales para evaluar la salud de tu mascota y brindarle el mejor cuidado.</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-cyan-800 mb-4">Vacunación</h3>
                        <p className="text-lg text-gray-700">Protege a tu mascota con nuestro servicio de vacunación profesional y seguro.</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-bold text-cyan-800 mb-4">Emergencias</h3>
                        <p className="text-lg text-gray-700">Estamos disponibles para atender emergencias y garantizar el bienestar de tu mascota.</p>
                    </div>
                </div>
            </section>

            <section className="bg-white py-30 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-cyan-800 mb-6">Sobre Nosotros</h2>
                    <p className="text-xl text-gray-700 mb-4">
                        En nuestra veterinaria, nos dedicamos a proporcionar atención médica de calidad y cariño a tus mascotas.
                        Nuestro equipo de profesionales está comprometido con el bienestar y la felicidad de tus compañeros peludos.
                    </p>
                    <p className="text-xl text-gray-700">
                        Creemos en la importancia de la prevención, el cuidado personalizado y el amor por los animales.
                        ¡Gracias por confiar en nosotros para cuidar a tus seres queridos!
                    </p>
                </div>
            </section>
        </>
    )
}