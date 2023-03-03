const Restaurants = require('../models/restaurants.model');
const Reviews = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurants.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Reviews,
        where: {
          status: 'active',
        },
      },
    ],
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 400));
  }

  req.restaurant = restaurant;
  next();
});

exports.validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      id,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError('Review not found', 400));
  }

  req.review = review;
  next();
});
