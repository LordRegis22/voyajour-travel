const db = require('../models/mainModel.js');

const itineraryController = {};

itineraryController.newLocation = (req, res, next) => {
  const { location, country } = req.body;

  const values = [location, country];
  const QUERY =
    'INSERT INTO locations (name, country) VALUES ($1, $2) RETURNING *;';
  db.query(QUERY, values)
    .then((newLocation) => {
      res.locals.success = true;
      const { _id, name, country } = newLocation.rows[0];
      const resObj = { location: name, country, id: _id };
      res.locals.newLocation = resObj;
      return next();
    })
    .catch((err) => {
      console.log('query ', err.stack);
      res.locals.success = false;
      return next();
    });
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


itineraryController.deleteLocation = (req, res, next) => {
  //db query to delete entire location based on user_id
  const {user_id, locationName} = req.params;

  const values = [user_id, locationName];

  const QUERY = 'DELETE FROM locations WHERE user_id='


}

module.exports = itineraryController;
