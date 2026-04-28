// Variables de entorno

import { config } from "dotenv"; // Importar el módulo dotenv para cargar variables de entorno desde un archivo .env
config(); // Cargar las variables de entorno desde el archivo .env

//Manejo de variables de entorno en Node.js
//node --env-file .env app.js


console.log(process.env.PORT); // Imprimir el valor de la variable de entorno PORT
console.log(process.env.HELLO); // Imprimir el valor de la variable de entorno HELLO

