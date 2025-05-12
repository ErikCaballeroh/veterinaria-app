const NotFound = () => {
    return (
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 bg-white min-h-[70vh] py-24">
            <div className="max-w-xl w-full">
                <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-800 mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 mb-4">¡Ups! Página no encontrada</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                    Lo sentimos, la página que buscas no existe o fue movida.<br />
                    Por favor, verifica la URL o vuelve al inicio.
                </p>
                <a
                    href="/"
                    className="inline-block bg-cyan-800 text-white px-8 py-4 rounded-full text-xl hover:bg-cyan-900 transition font-semibold shadow-md"
                >
                    Volver al inicio
                </a>
            </div>
        </main>
    );
};

export default NotFound;
