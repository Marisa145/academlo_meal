const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  // 1- traer name, email, password por req.body
  const { name, email, password, role } = req.body;

  //2. Convertir a minuscula la información que veamos relevante.
  name = name.toLowerCase();
  email = email.toLowerCase();
  //3. Instansiar el modelo, seteando los valores obtenidos
  const newUser = new Users({ username, email, password, role });
  //4. Encriptar contraseñas utilizando la libreria bycriptjs
  const salt = bcryptjs.genSaltSync();
  newUser.password = bcryptjs.hashSync(password, salt);
  //5. Guardar el usuario en base de datos
  await newUser.save();
  //6. Generar un JWT, la función de como se genera el JWT se vera más adelante
  const token = await generateJWT(newUser.id);
  //7. Enviar la respuesta al cliente
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
