
// Puerto
process.env.PORT = process.env.PORT || 3000;

//  Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  BD
let urlBD;

if (process.env.NODE_ENV === 'dev') {
  urlBD = '//localhost:27017/cafe';
} else {
  urlBD = process.env.MONGO_URI;
}
process.env.URL_BD = urlBD;
