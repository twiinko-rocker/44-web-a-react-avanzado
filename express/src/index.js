const express = require("express"); // Importar el módulo Express
const { users } = require("./data"); // Importar los datos de usuarios desde el archivo data.js
const logger = require("./middleware/logger"); // Importar el middleware de logger

const app = express(); // Crear una instancia de la aplicación Express
const PORT = 3000; // Definir el puerto en el que el servidor escuchará las solicitudes

app.use(logger); // Usar el middleware de logger para todas las rutas
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON

// Ruta para obtener todos los usuarios
app.get("/users", (req, res) => {
  res.json(users); // Enviar la lista de usuarios como respuesta en formato JSON
});

//CREAR UNA RUTA BASICA (ENDPOINT) EN LA RAIZ QUE CORRESSPONDE AL HOME

app.get("/", (req, res) => {
  res.send("Hola mundo desde Express");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

