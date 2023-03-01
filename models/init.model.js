const Meals = require('./meals.model');
const Orders = require('./orders.model');
const Restaurants = require('./restaurants.model');
const Reviews = require('./reviews.model');
const Users = require('./users.model');

const initModel = () => {
  //1-restaurants <----> M-reviews
  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);
  //1-users<----> M-reviews
  Users.hasMany(Reviews);
  Reviews.belongsTo(Users);
  //1-users<----> M-orders
  Users.hasMany(Orders);
  Orders.belongsTo(Users);
  //1-restaurants <----> M-meals
  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);
  //1-meals <----> 1-orders
  Meals.hasOne(Orders);
  Orders.belongsTo(Meals);
};

module.exports = initModel;
