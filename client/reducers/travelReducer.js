// import our actiontypes from constants/actionsTypes;
import axios from 'axios';
import * as types from '../constants/actionTypes.ts';
// our initialState for this reducer needs some cleaning up. We have this one
// and formReducer which are combined in the index.js file with the combineReducer method

// note, because of the way we set up index.js, this state is accesssed w/ state.trips;
const initialState = {
  activeLocationId: 0,
  count: 0,
  // trips contains objects with keys: id(unique to location), location(str), country(str)
  trips: [],
  // activities contains objects with keys: description, notes, address, link, (strs); completed(bool); locationID (num correlating to location; id (num, unique to activity))
  activities: [],
  //holds all activities so that
  activityStore: [],
};

const travelReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_COUNT: {
      const count = state.count + 1;
      return { ...state, count };
    }

    // populate activites that are returned on user login
    case types.POPULATE_ACTIVITIES: {
      const newActivities = action.payload.activities;
      // location will be an object with _id, name, country, user_id
      const newLocations = action.payload.locations;
      return {
        ...state,
        activities: newActivities,
        activityStore: newActivities,
        trips: newLocations,
      };
    }

    case types.GET_ACTIVITIES: {
      const { payload } = action;
      // create new var to hold new active location id
      const newActiveLocationId = payload;
      // filter through relevant activities and update state.trips.activities to only items that match activeLocationId
      const relevantActivities = state.activityStore.filter(
        (activity) => newActiveLocationId === parseInt(activity.location_id)
      );
      console.log(relevantActivities);
      // return copy of state object with state spread out, set activities to filtered activities and activeLocationId to new activeLocationId
      return {
        ...state,
        activities: relevantActivities,
        activeLocationId: newActiveLocationId,
      };
    }
    // this action sends a request to our server.
    case types.ADD_NEW_LOCATION: {
      console.log('inside travel reducer, state.trips:', state.trips);
      const newTrips = state.trips.slice();
      newTrips.push(action.payload);
      return {
        ...state,
        trips: newTrips,
        activeLocationId: newTrips[newTrips.length - 1].locationId,
      };
    }

    // adds activity card to activities array after being being saved to DB in storeNewActivity thunk in actions.js
    case types.ADD_ACTIVITIES: {
      const newActivities = state.activities.slice();
      const newActivityStore = state.activityStore.slice();
      newActivities.push(action.payload);
      newActivityStore.push(action.payload);
      return {
        ...state,
        activities: newActivities,
        activityStore: newActivityStore,
      };
    }

    // removes location card from locations array after being being removed from DB in removeLocationCard thunk in actions.js
    case types.DELETE_ACTIVITY_CARD: {
      console.log(
        `inside delete_activity_card travelreducer: ${action.payload}`
      );
      const activityId = action.payload;
      const updatedActivities = state.activityStore.filter(
        (activity) => activity._id !== activityId
      );
      const updatedActivityStore = state.activityStore.filter(
        (activity) => activity._id !== activityId
      );
      return {
        ...state,
        activities: updatedActivities,
        activityStore: updatedActivityStore,
      };
    }

    // removes location card from locations array after being being removed from DB in removeLocationCard thunk in actions.js
    case types.DELETE_LOCATION_CARD: {
      const locationId = action.payload;
      const updatedTrips = state.trips.filter(
        (trip) => trip._id !== locationId
      );
      return {
        ...state,
        trips: updatedTrips,
      };
    }

    default:
      return state;
  }
};

export default travelReducer;
