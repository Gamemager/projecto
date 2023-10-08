import moment from "moment";
import { pool } from "../db.js";
import router from "../routes/usuarios.routes.js";

export const getUsuarios= async (req, res) => {
    try{
        const [rows] = await pool.query ('SELECT * FROM usuarios')
        res.json(rows);
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}
export const getUsuario = async(req, res) => {
    try{
        console.log (req.params.Id)
        const [rows]= await pool.query('SELECT * FROM usuarios WHERE Id= ?', [req.params.Id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.json (rows[0])
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const createUsuarios= async (req, res) => {
    const {Full_name, DOB, Usuario, Password, Tipo_usuario} =req.body
    try{
        const [rows] = await pool.query('INSERT INTO usuarios(Full_name, DOB,Usuario,Password, Tipo_usuario) VALUES(?,?,?,?,?)', [Full_name, DOB,Usuario,Password, Tipo_usuario]);
        res.send ({
            Id: rows.insertId,
            Full_name, 
            DOB, 
            Usuario, 
            Password, 
            Tipo_usuario
    
        })

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }
    

}

export const deleteUsuarios= async (req, res) => {
    try{
        const [resuld] = await pool.query ('DELETE FROM usuarios WHERE Id=?', [req.params.Id])
        
        if (resuld.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no Encontrado'
        })
        res.sendStatus(204)

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const updateUsuarios= async (req, res) => {
    const {Id}= req.params
    const {Full_name, DOB, Usuario, Password, Tipo_usuario} =req.body
   
    try{
        const [resuld]= await pool.query( 'UPDATE usuarios SET Full_name = IFNULL(?, Full_name), DOB = IFNULL(?,DOB), Usuario= IFNULL(?,Usuario), Password = IFNULL(?, Password), Tipo_usuario = IFNULL(? ,Tipo_usuario) WHERE Id = ?', [Full_name, DOB,Usuario,Password, Tipo_usuario, Id])
        console.log(resuld)
    
        if (resuld.affectedRows ===0) return res.status(404).json ({
            message: 'Usuario no Encontrado'
        })
        const [rows]= await pool.query ('SELECT * FROM usuarios WHERE Id = ?', [Id])
        res.json(rows[0])
        
    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

const createToken = (user) =>{
    let payload= {
        UsuarioId: Usuario.Id,
        createAt: moment().unix(),
        expiresAt: moment().add(1,'day').unix()
    }
    return jwt.encode(payload,process.env.TOKEN_KEY);
}

/*router.use(middleware.checkToken)

router.get('/mainUser', (req, res)=>{
    getUsuario (req.UsuarioId)
    .then(rows =>{
        res.json(rows);
    })
    .catch (err => console.log (err));
});

export default router */

