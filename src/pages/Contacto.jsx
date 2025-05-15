export const Contacto = () => {
    return (
        <>
            <main className="flex-grow flex items-center justify-center text-center px-4 bg-white my-20">
                <div className="max-w-2xl w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-800">Contáctanos</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        ¡Estamos aquí para ayudarte! Puedes comunicarte con nosotros a través de los siguientes medios:
                    </p>
                    <div className="bg-white rounded-lg p-6 shadow text-left mb-8">
                        <h3 className="text-2xl font-bold text-cyan-800 mb-2">Datos de contacto</h3>
                        <p className="text-gray-700 mb-1"><span className="font-semibold">Teléfono:</span> (123) 456-7890</p>
                        <p className="text-gray-700 mb-1"><span className="font-semibold">Correo:</span> contacto@veterinaria.com</p>
                        <p className="text-gray-700 mb-4"><span className="font-semibold">Dirección:</span> Calle Ficticia 123, Ciudad, País</p>
                        <div className="flex gap-4 items-center mt-4 flex-wrap">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition text-lg">
                                Facebook
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-full shadow hover:brightness-110 transition text-lg">
                                Instagram
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition text-lg">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow mb-8">
                        <iframe
                            title="Ubicación Veterinaria"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.123456789!2d-99.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjAiTiA5OcKwMDcnMTIuMCJX!5e0!3m2!1ses-419!2smx!4v1680000000000!5m2!1ses-419!2smx"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </main>
        </>
    )
}
