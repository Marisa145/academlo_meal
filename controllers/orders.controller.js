const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.model');
const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;

  const meal = await Meals.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });
  const priceTotal = meal.price * quantity;

  const newOrder = await Orders.create({
    quantity,
    mealId: meal.id,
    totalPrice: priceTotal,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: 'Success',
    message: 'Order created successfully',
    newOrder: {
      id: newOrder.id,
      mealId: newOrder.mealId,
      userId: newOrder.userId,
      totalPrice: newOrder.totalPrice,
      quantity: newOrder.quantity,
      status: newOrder.status,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Orders.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Meals,
        include: [
          {
            model: Restaurants,
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'sucsess',
    message: 'Orders successfully obtained',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const updateOrder = await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'sucsess',
    message: 'Order update successfully',
    updateOrder,
  });
});

exports.cancelledOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const deleteOrder = await order.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'sucsess',
    message: 'Order delete successfully',
    deleteOrder,
  });
});
