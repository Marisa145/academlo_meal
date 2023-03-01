const Router = require('express');
const { check } = require('express-validator');
const {
  getAllMeals,
  getOneMeal,
  updateMeal,
  disableMeal,
  createMeal,
} = require('../controllers/meals.controller');
const {
  protect,
  restrictTo,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validMeal } = require('../middlewares/meals.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', getAllMeals),
  router.get('/:id', validMeal, getOneMeal),
  router.use(protect);
router.post(
  '/:id',
  [
    check('name', 'The name meal require').not().isEmpty(),
    check('price', 'The price is require').not().isEmpty(),
    check('description', 'The description is require').not().isEmpty(),
    restrictTo('admin'),
    validateFields,
    protectAccountOwner,
  ],
  createMeal
),
  router.patch(
    ':id',
    restrictTo('admin'),
    validMeal,
    protectAccountOwner,
    updateMeal
  ),
  router.delete(
    '/:id',
    restrictTo('admin'),
    validMeal,
    protectAccountOwner,
    disableMeal
  );

module.exports = {
  mealsRouter: router,
};
