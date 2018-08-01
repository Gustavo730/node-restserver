
// Puerto
process.env.PORT = process.env.PORT || 3000;

//  Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  BD
let urlBD;

if (process.env.NODE_ENV === 'dev') {
  urlBD = 'mongodb://localhost:27017/cafe';
} else {
  urlBD = process.env.MONGO_URI;
}
process.env.URL_DB = urlBD;

//  Vencimiento del token { 60' * 60'' * 24hrs * 30d }
process.env.TOKEN_EXPIRES = 60 * 60 * 24 * 30;

//  SEED de autenticación
process.env.SEED = process.env.SEED || 'seed-dev';
