const Router = require('express');
const { createUser, loginUser } = require('../controllers/auth.controller');
const { validIfExistUserEmail } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post('/signup', validIfExistUserEmail, validateFields, createUser);

router.post('/login', validIfExistUserEmail, loginUser);

module.exports = {
  authRouter: router,
};
