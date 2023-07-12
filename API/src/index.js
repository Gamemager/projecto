
//servidor 
import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js'
import inventarioRoutes from './routes/inventario.routes.js'
import {PORT} from './config.js' 
const app =express();

app.use(express.json());

//rutas 
app.use('/api',usuariosRoutes);
app.use ('/api', inventarioRoutes)

//ruta no encontrada

app.use ((req, res, next)=> {
    res.status(404).json({
        message: 'Ruta no encontrada'
    })
})

//puerto
app.listen (PORT);
console.log ('server running on port', PORT);



