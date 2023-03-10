const Router = require('express');
const { check } = require('express-validator');
const {
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  disableRestaurant,
  createReview,
  updateReview,
  disableReview,
  createRestaurant,
} = require('../controllers/restaurants.controller');
const {
  protect,
  restrictTo,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validRestaurantById,
  validReview,
} = require('../middlewares/restaurant.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', getAllRestaurants),
  router.get('/:id', validRestaurantById, getOneRestaurant),
  router.post(
    '/',
    [
      check('name', 'The name Restaurant is require').not().isEmpty,
      check('address', 'The address Restaurant is require').not().isEmpty,
      check('rating', 'The rating Restaurant is require').not().isEmpty,
      restrictTo('admin'),
      validateFields,
      validRestaurantById,
    ],
    createRestaurant
  ),
  router.use(protect);
router.patch(
  ':id',
  [
    check('name', 'The name Restaurant is require').not().isEmpty,
    check('address', 'The address Restaurant is require').not().isEmpty,
    check('rating', 'The rating Restaurant is require').not().isEmpty,
    restrictTo('admin'),
    validateFields,
    validRestaurantById,
  ],
  updateRestaurant
),
  router.delete(
    '/:id',
    restrictTo('admin'),
    protectAccountOwner,
    validRestaurantById,
    disableRestaurant
  ),
  router.post('/reviews/:id', restrictTo('client'), createReview),
  router.patch(
    '/reviews/:restaurantId/:id',
    [
      check('comment', 'The comment is require').not().isEmpty(),
      check('rating', 'The rating Restaurant is require').not().isEmpty(),
      validateFields,
      validReview,
      validRestaurantById,
      restrictTo('client'),
    ],
    updateReview
  );
router.delete(
  '/reviews/:restaurantId/:id',
  validRestaurantById,
  validReview,
  restrictTo('client'),
  disableReview
);

module.exports = {
  restaurantsRouter: router,
};
