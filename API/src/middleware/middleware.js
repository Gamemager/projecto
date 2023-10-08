import jwt from 'jwt-simple';
import moment from 'moment';
import router from '../controllers/usuarios.controllers';

const checkToken = (req, res, next) => {
    if (!req.headers['user_token'])
        return res.json ({
            error: 'error'
        });
    
    const token = req.headers['user_token'];
    let payload = null
    try {
        payload = jwt.decode(token, process.env.TOKEN_KEY)
    } catch (err){
        return res.json ({
            error: 'Token Invalido'
        });
    }
    if (moment().unix() > payload.expiresAt){
        return res.json({error:'Token Expirado'});
    };

    req.UsuarioId = payload.UsuarioId;
    next();
};

export default router
module.exports ={
    checkToken: checkToken
}