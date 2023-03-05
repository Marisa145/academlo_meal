const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  // 1- traer name, email, password por req.body
  const { name, email, password, role } = req.body;

  //2. Instansiar el modelo, seteando los valores obtenidos
  const newUser = new Users({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });
  //3. Encriptar contraseñas utilizando la libreria bycriptjs
  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt);
  //4. Guardar el usuario en base de datos
  await newUser.save();
  //5. Generar un JWT, la función de como se genera el JWT se vera más adelante
  const token = await generateJWT(newUser.id);
  //6. Enviar la respuesta al cliente
  res.status(201).json({
    status: 'success',
    id: newUser.id,
    token,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1.comprobar que el usuario exista
  const user = await Users.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  //2.comprobar que la contraseña sea correcta
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3.generar JWT
  const token = await generateJWT(user.id);
  //enviar respuesta al cliente
  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
exports.renewToken = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const token = await generateJWT(id);

  const user = await Users.findOne({
    attributes: ['id', 'username', 'email', 'role'],
    where: {
      status: true,
      id,
    },
  });

  return res.status(200).json({
    status: 'sucsess',
    token,
    user,
  });
});
