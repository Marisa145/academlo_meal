const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.model');
const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Orders.findAll({
    where: {
      userId: sessionUser.id,
      status: true,
    },
    include: [
      {
        model: Meals,
        where: {
          status: 'active',
        },
        include: [
          {
            model: Restaurants,
            where: {
              status: 'active',
            },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'sucsess',
    message: 'the users was successfully obtained',
    orders,
  });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  //TODO: acordarme de hacer esta mejora o esta refactorización
  const order = await Orders.findOne({
    where: {
      userId: sessionUser.id,
      id,
      status: true,
    },
    include: [
      {
        model: Meals,
        where: {
          status: 'active',
        },
        include: [
          {
            model: Restaurants,
            where: {
              status: 'active',
            },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'sucsess',
    message: 'the user was successfully obtained',
    order,
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.disableAccount = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
