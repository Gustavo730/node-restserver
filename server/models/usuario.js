

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El Nombre es requerido']
  },
  correo: {
    type: String,
    unique: true,
    required: [true, 'El Correo es requerido']
  },
  clave: {
    type: String,
    required: [true, 'La Contraseña es requerida']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: roles
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.clave;

  return userObject;  
}

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} ya existe en la base de datos'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
