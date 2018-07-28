
// Puerto
process.env.PORT = process.env.PORT || 3000;

//  Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  BD
let urlBD;

if (process.env.NODE_ENV === 'dev') {
  urlBD = '//localhost:27017/cafe';
} else {
  urlBD = 'mongodb://cafe-user:123456a@ds257981.mlab.com:57981/cafe';
}
process.env.URL_BD = urlBD;
