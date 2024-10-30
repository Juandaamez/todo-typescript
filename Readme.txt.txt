Esta es una Prueba Técnica para Desarrollador Junior Fullstack TTT

Esta es una aplicación web para gestionar tareas (to-do list), en la que los usuarios puedan:
1. Crear una cuenta e iniciar sesión.
2. Crear, ver, editar y eliminar tareas.
3. Cada tarea tiene un estado ('pendiente', 'en progreso' o 'completada') y una fecha de vencimiento.

Hecha en windows, así que los siguientes son instrucciones para usar símbolo de sistema, también se ha usado VS code y postman para probar el back-end

Para iniciar el back-end, se recomienda tener nvm-windows o descargar las versiones que se mencionan a continuación:

Instrucciones de instalación:
Node.js 18.20.4
NestJS 8
Next.js 15.0.2

INTRUCCIONES DETALLADAS:
Si se tiene nvm instalado ejecutar en terminal:

nvm -v

Luego:

nvm install 18.20.4

Luego: 

nvm use 18.20.4

Y verificamos con:

node -v

TAMBIEN instalamos:

npm install -g @nestjs/cli@8
npm install next@15.0.2

Procedemos a abrir el proyecto backend, y en terminal de proyecto:

npm install

Luego:

npm run start

Procedemos a abrir el proyecto frontend, y en terminal del proyecto:

npm install

Luego:

npm run dev


Faltante por tiempo:
Actualmente, las tareas creadas por un usuario pueden ser visibles o editables por otro usuario, con algo mas de tiempo podemos añadir una lógica en el backend para vincular cada tarea a un usuario específico (por ejemplo, a través de userId).

Decisiones técnicas tomadas:
Usamos @nestjs/jwt para implementar JWT como mecanismo de autenticación, lo cual permite mantener las sesiones de los usuarios de forma segura y escalable.

Los DTOs (Data Transfer Objects) fueron utilizados para manejar y validar los datos de entrada en las rutas.

Front-end:
Para simplificar el código, optamos por manejar el estado local en los componentes con useState y useEffect.

Se utilizó Tailwind CSS para la estilización.

Se seleccionó Axios para manejar las peticiones al backend debido a su sencillez y soporte para interceptores. Esto facilita añadir el token de autenticación en cada solicitud y centralizar el manejo de errores.

Almacenar el token en localStorage

Desarollado por Juan David Amezquita Nuñez









