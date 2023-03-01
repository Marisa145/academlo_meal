const Orders = require('../models/orders.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 400));
  }

  req.order = order;
  next();
});

exports.userOrderOnly = catchAsync(async (req, res, next) => {
  const { order, sessionUser } = req;

  if (sessionUser.id !== order.userId) {
    return next(
      new AppError(
        'Only the user who made the order can only perform these operations',
        404
      )
    );
  }

  next();
});
