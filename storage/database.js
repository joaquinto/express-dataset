const DataStore = require("nedb");
const db = {};
db.actors = new DataStore("storage/actors.db");
db.events = new DataStore("storage/events.db");

db.actors.loadDatabase();
db.events.loadDatabase();

const actors = db.actors;
const events = db.events;

module.exports = {
  actors: actors,
  events: events,
};
