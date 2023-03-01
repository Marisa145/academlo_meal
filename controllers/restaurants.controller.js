const Restaurants = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Review,
        where: {
          status: 'active',
        },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The restaurant found were successfully',
    restaurants,
  });
});
exports.getOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'sucsess',
    message: 'the restaurant was successfully obtained',
    restaurant,
  });
});
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurants.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });
  res.status(201).json({
    status: 'success',
    message: 'The restaurant was created successfully',
    newRestaurant,
  });
});
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, address } = req.body;

  const updatedRes = await restaurant.update({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
  });

  res.status(200).json({
    status: 'success',
    message: 'Then restaurant has been updated successfully',
    updatedRes,
  });
});
exports.disableRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
    message: 'the restaurant has been successfully disable',
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;
  const { comment, rating } = req.body;

  const newReview = await Restaurants.create({
    userId: sessionUser.id,
    restaurantId: restaurant.id,
    comment,
    rating,
  });
  res.status(201).json({
    status: 'success',
    message: 'Review Created successfuly',
    newReview: {
      id: newReview.id,
      restaurantId: newReview.restaurantId,
      status: newReview.status,
      rating: newReview.rating,
      comment: newReview.comment,
    },
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const { review, restaurant, sessionUser } = req;

  const { comment, rating } = req.body;

  const updateReview = await review.update({
    comment: comment.toLowerCase(),
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'review update successfully',
    updateReview: {
      id: updateReview.id,
      userId: updateReview.userId,
      restaurantId: updateReview.restaurantId,
      comment: updateReview.comment,
      rating: updateReview.rating,
      status: updateReview.status,
    },
  });
});
exports.disableReview = catchAsync(async (req, res, next) => {
  const { review, restaurant, sessionUser } = req;

  await review.update({
    restaurantId: restaurant.id,
    userId: sessionUser.id,
    status: 'deleted',
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'Review deleted',
  });
});
