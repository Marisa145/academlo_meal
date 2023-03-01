const jwt = require('jsonwebtoken');

//1- definimos la funcio que reciba el id como parametro
const generateJWT = id => {
  //al no saber el tiempo se demore en generar el jwt utilizamos ‘promise’

  return new Promise((resolve, reject) => {
    //establecemos el payload del token que sera el id del usuario
    const payload = { id };
    //firmamos el token con el id del usuario y le agregamos un tiempo de expiración
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }
        //resolvemos enviando el token
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
