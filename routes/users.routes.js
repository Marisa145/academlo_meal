const Router = require('express');
const {
  getAllOrders,
  getOneOrder,
  updateProfile,
  disableAccount,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/users.middleware');

const router = Router();

router.use(protect);

router.get('/orders', getAllOrders);

router.get('/orders/:id', getOneOrder);

router.patch(
  '/:id',
  validIfExistUser,
  validIfExistUserEmail,
  protectAccountOwner,
  updateProfile
);

router.delete(
  '/:id',
  validIfExistUser,
  validIfExistUserEmail,
  protectAccountOwner,
  disableAccount
);

module.exports = {
  usersRouter: router,
};
