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

app.post("/users", (req, res) => {
  const { name } = req.body; // Obtener el nombre y correo electrónico del cuerpo de la solicitud

  if (!name) {
    return res.status(400).json({ error: "Nombre es requerido" }); // Validar que se proporcionen ambos campos


  }

  const newUser = {
    id: users.length + 1, // Generar un ID para el nuevo usuario
    name // Asignar el nombre al nuevo usuario
  }

  users.push(newUser); // Agregar el nuevo usuario a la lista de usuarios
  res.status(201).json(newUser); // Enviar el nuevo usuario como respuesta con el código de estado 201 (Creado)
})

app.delete("/users/:id", (req, res) => {

  const id = parseInt(req.params.id); // Obtener el ID del usuario a eliminar desde los parámetros de la ruta
  const index = users.findIndex(user => user.id === id); // Buscar el índice del usuario en la lista de usuarios
  
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" }); // Validar que el usuario exista
  }

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]); // Enviar el usuario eliminado como respuesta

}) // Ruta para eliminar un usuario por ID (a implementar)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

