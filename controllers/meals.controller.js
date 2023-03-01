const Meals = require('../models/meals.model');
const catchAsync = require('../utils/catchAsync');
const Restaurants = require('../models/restaurants.model');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId } = req.body;

  const newMeals = await Meals.create({
    name: name.toLowerCase(),
    price,
    restaurantId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Meal created successfully',
    newMeals,
  });
});

exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurants,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The meals found were successfully',
    meals,
  });
});

exports.getOneMeal = catchAsync(async (req, res, next) => {
  const { meals } = req;

  res.status(200).json({
    status: 'success',
    message: 'Meals was found successfully',
    meals,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meals } = req;

  const { name, price } = req.body;

  const updatedMeals = await meals.update({
    name: name.toLowerCase(),
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Then meals has been updated successfully',
    updatedMeals,
  });
});

exports.disableMeal = catchAsync(async (req, res, next) => {
  const { meals } = req;

  await meals.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been successfully disabled',
  });
});
