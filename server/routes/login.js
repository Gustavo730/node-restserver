const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();


app.post('/login', function (req, res){

  let body = req.body;

  Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos'
        }
      });
    }

    if (!bcrypt.compareSync(body.clave, usuarioDB.clave)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos'
        }
      });
    }

    let token = jwt.sign({
      usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES })

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })

  });

})


module.exports = app;
