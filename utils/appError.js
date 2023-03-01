//definir la clase que herede los erro incorporados en la app
class AppError extends Error {
  //en los parametros del construtor pasamos el mensaje y codigo de estado
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    //establecemos el estado de error donde el 'error' es proveniente del clienet o 'fail si es del servidor
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
