const db = require('../models/mainModel.js');

const itineraryController = {};

itineraryController.newPlan = (req, res, next) => {
  console.log(req.body);
  return next();
  // we're being sent an array of objects, with keys location and country
  // destructure the country and location from req
  // declare an array that will hold our location and country variables
  // declare a variable that will hold the SQL query, to PUT or INSERT
  // [ Los Angeles, USA ]
  // `INSERT INTO location
  // VALUES ${location}
  // ;`
  // db.query( queryString, array of variables )
};


itineraryController.updateActivity = (req, res, next) => {
  //deconstruct req.body.
  const {activity_id, description, notes, link, address, completed} = req.body;

  //values to be used in the query.
  const values = [activity_id, description, notes, link, address, completed];

  //activities table columns: _id, location_id, user_id, link, notes, address, completed, description
  const QUERY= 'UPDATE activities SET description=(description), notes=(notes), link=(link), address=(address), completed=(completed) WHERE _id=(activity_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

  db.query(queryStr, values)
    .then((updatedActivity) => {
      //return an object containing the updated activity
      res.locals.success = true;

      //save the updated activity and return to the client
      res.locals.updatedActivity = updatedActivity;
      return next();
    })
    .catch((err) => {
      res.locals.success = false;
      return next();
    });
};


module.exports = itineraryController;
