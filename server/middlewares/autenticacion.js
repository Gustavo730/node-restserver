
const jwt = require('jsonwebtoken');

// Verificar TOKEN
let verificaToken = (req, res, next) =>{

  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) =>{
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no válido'
        }
      });
    }

    req.usuario = decoded.usuario;
    next();

  });

};

let verificaAdmin_Role = (req, res, next) => {

  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else{
    return res.json({
      ok: false,
      err:{
        message: 'Usuario no tiene permisos para realizar la acción'
      }
    });
  }


}

module.exports = {
  verificaToken,
  verificaAdmin_Role
}
