# Tripleten Sprint 15 web_project_around_express

WEB PROJECT AROUND WITH EXPRESS

Este es un proyecto web basado en Express.js que utiliza un archivo JSON para almacenar información de usuarios. El archivo JSON se encuentra en la ruta `data/users.json`. El proyecto tiene una ruta `/users/:_id` que permite obtener información de un usuario específico por su ID. Si el usuario no se encuentra, se devuelve un mensaje de error 404.
Tambien utiliza un archivo JSON para almacenar informacion de las tarjetas de la web. El archivo JSON se encuentra en la ruta `data/tarjetas.json`. El proyecto tiene una ruta `/cards/:_id` que permite obtener información de una tarjeta específica por su ID. Si la tarjeta no se encuentra, se devuelve un mensaje de error 404.

Se usan las siguientes dependencias:
- Express.js
- JSON.parse
- fs.readFileSync

# Tripleten Sprint 16 web_project_around_express

WEB PROJECT AROUND WITH EXPRESS, MONGODB AND MONGOOSE

Este es un proyecto web basado en Express.js que utiliza la base de datos MongoDB y Mongoose para almacenar información de usuarios y tarjetas. Para ello se realiza una REST API separando responsabilidades en los archivos respectivos dependiendo de su función. El modelo de guardar la información en la base de datos se obtiene desde el directorio models con sus respectivos archivos user.js y card.js; como en el sprint anterior se usan los enrutadores respectivos pero esta vez ellos solo cumplen solo esa funcion y usan los respectivos archivos controladores que son los encargados de realizar todas las funciones de control respectivas para las cuales son citados, como por ejemplo:

- Recibir usuarios o tarjetas con GET
- Obtener un usuario o tarjeta por su ID con GET
- Crear usuarios o tarjetas con POST
- Actualizar usuarios o tarjetas con PATCH
- Actualizar avatar del usuario con PATCH
- Eliminar usuarios o tarjetas con DELETE
- Obtener un usuario o tarjeta por su ID con GET
- 
Se usan las siguientes dependencias:
- Express.js
- JSON.parse
- Mongoose
