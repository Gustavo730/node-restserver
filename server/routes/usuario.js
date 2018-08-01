
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


app.get('/usuario', verificaToken , (req, res) => {

  // return res.json({
  //   usuario: req.usuario,
  //   nombre: req.usuario.nombre,
  //   correo: req.usuario.correo,
  //   _id: req.usuario._id
  // })


  let desde = Number(req.query.desde) || 0;
  let limite = Number(req.query.limite) || 5;

  Usuario.find({ estado: true }, 'nombre correo estado role google img')
  .skip(desde)
  .limit(limite)
  .exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    Usuario.count({ estado: true }, (err, cantidad) => {
      res.json({
        ok: true,
        cantidad,
        usuarios
      });
    });
  });



});

app.post('/usuario',[verificaToken, verificaAdmin_Role], function (req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    clave: bcrypt.hashSync(body.clave, 13),
    correo: body.correo,
    role: body.role,
  });

  usuario.save((err, usuarioDB) =>{

    if (err) {
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });

  });
});

app.put('/usuario/:id',[verificaToken, verificaAdmin_Role], function(req, res) {

  let id = req.params.id;
  let body = _.pick(req.body, ['nombre','correo','img','role','estado']);

  Usuario.findByIdAndUpdate(id, body, { new:true, runValidators: true }, (err, usuarioDB) => {

    if (err) {
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });

  });
});

app.delete('/usuario/:id',[verificaToken, verificaAdmin_Role], function (req, res) {

  let id = req.params.id;
  let estado = {estado: false};

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  Usuario.findByIdAndUpdate(id, estado, {new: true},(err, usuarioBorrado) => {
    if (err) {
      return res.status(404).json({
        ok: false,
        err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'Usuario no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      message: 'Usuario deshabilitado',
      usuario: usuarioBorrado
    });
  });
});

module.exports = app;
