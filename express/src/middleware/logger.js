const logger = (req, res, next) => { // Middleware de logger para registrar el método HTTP y la URL de cada solicitud entrante

    console.log(`${req.method} ${req.url}`); // Imprimir el método HTTP y la URL de la solicitud en la consola

    next(); // Llamar a next() para pasar el control al siguiente middleware o ruta en la cadena de procesamiento
}


module.exports = logger;