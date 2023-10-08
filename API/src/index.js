import express from 'express';
<<<<<<< HEAD
import usuariosRoutes from './routes/usuarios.routes.js'
import inventarioRoutes from './routes/inventario.routes.js'
import {PORT} from './config.js' 
import cors from 'cors'
import { configDotenv } from 'dotenv';
const app =express();
=======
import usuariosRoutes from './routes/usuarios.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import { PORT } from './config.js';
import cors from 'cors';
>>>>>>> 53318d147a645391f401b5124f3b7aff2ccb85c1

const app = express();

// Lista blanca de orígenes permitidos (agrega más si es necesario)
const whitelist = ['http://localhost:4200'];

// Opciones de configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

// Habilitar CORS en la aplicación
app.use(cors(corsOptions));
app.use(express.json());

// Rutas de la API
app.use('/api', usuariosRoutes);
app.use('/api', inventarioRoutes);

// Servir archivos estáticos (HTML, CSS, JS, etc.)
app.use('/', express.static('html'));

// Ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log('Servidor en ejecución en el puerto', PORT);
});
