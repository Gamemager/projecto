import router from "../routes/usuarios.routes";
import { getUsuario } from "./usuarios.controllers";

router.post('/login', async (req,res)=>{
    const user = await getUsuario(req.body.Id)
    if(user === undefined){
        res.json({
            error: 'error'
        })
    }else {
        const equals = bcrypt.compareSync(req.body.Password, Usurario.Password);
        if (!equals){
            res.json({
                error: 'error'
            });
        }else {
            res.json({
                succesfull: createToken (user),
                done: 'Login Correc'
            });
        }
    }
});