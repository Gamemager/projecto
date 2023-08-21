
//servidor 
import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js'
import inventarioRoutes from './routes/inventario.routes.js'
import {PORT} from './config.js' 
import cors from 'cors'
const app =express();


//const WhiteList= ['http://localhost:4200']
app.use(express.json());
app.use(cors());

//rutas 
app.use('/api',usuariosRoutes);
app.use ('/api', inventarioRoutes)
app.use("/", express.static("html"));

//ruta no encontrada

app.use ((req, res, next)=> {
    res.status(404).json({
        message: 'Ruta no encontrada'
    })
})

//puerto
app.listen (PORT);
console.log ('server running on port', PORT);



