const Router = require('express');
const {
  createOrder,
  getAllOrders,
  updateOrder,
  cancelledOrder,
} = require('../controllers/orders.controller');
const {
  protectAccountOwner,
  protect,
} = require('../middlewares/auth.middleware');
const {
  validOrder,
  userOrderOnly,
} = require('../middlewares/orders.middleware');

const router = Router();

router.use(protect);

router.post('/', createOrder),
  router.get('/me', getAllOrders),
  router.patch(
    ':id',
    protectAccountOwner,
    validOrder,
    userOrderOnly,
    updateOrder
  ),
  router.delete(
    '/:id',
    protectAccountOwner,
    validOrder,
    userOrderOnly,
    cancelledOrder
  );

module.exports = {
  ordersRouter: router,
};
