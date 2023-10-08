import express from 'express';
import router from express.Router;
import usuariosRoutes from '../routes/usuarios.routes'
const Usuarios = require ('./usuarios.controllers');
import bcrypt from 'bcrypt';
const jwt = require ('jwt-simple');
const moment = require ('moment');

router.post ('/register', async (req, res)=>{
    console.log(req.body);
    req.body.Password = bcrypt.hashSync(req.body.Password,10);
    const result = await Usuarios.createUsuarios(req.body);7
    res.json(result);
})
