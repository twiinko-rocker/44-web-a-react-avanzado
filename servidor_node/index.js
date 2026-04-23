// Cargar modulo nativo http de node.js
const http = require('http');


//creamos el servidor que responde a las solicitudes del navegador
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Establecer el encabezado de la respuesta
    res.end('Hola mundo desde Node.js'); // Enviar la respuesta al navegador
})



//funcion qque escuche el pouerto 3000

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});