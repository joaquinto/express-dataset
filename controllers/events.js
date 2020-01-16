const store = require('../storage/database');

const getAllEvents = (req, res, next) => {
	store.events.find({}).sort({ id: 1 }).exec(function(error, events) {
		if (error) {
			return next(error);
		}
		return res.status(200).json({ status_code: 200, body: events });
	})
};

const addEvent = (req, res, next) => {
	const newEvent = {
		"id": req.body.id,
		"type": req.body.type,
		"actor": {
			"id": req.body.actor.id,
			"login": req.body.actor.login,
			"avatar_url": req.body.actor.avatar_url,
		},
		"repo": {
			"id": req.body.repo.id,
			"name": req.body.repo.name,
			"url": req.body.repo.url,
		},
		"created_at": req.body.created_at,
	};
	store.events.insert(newEvent, function(error) {
		if (error) {
			return next(error);
		}
		return res.status(201).json({ status_code: 201, body: {} });
	});
};


const getByActor = (req, res, next) => {
	store.events.find({ 'actor.id': Number(req.params.actorID) }).sort({ id: 1 }).exec(function(error, events) {
		if (error) {
			return next(error);
		}
		if (!events.length) {
			return res.status(404).json({ status_code: 404, error: new Error('Events not found') });
		}
		events.forEach((event) => {
			delete event._id;
		});
		return res.status(200).json({ status_code: 200, body: events });
	});
};


const eraseEvents = (req, res, next) => {
	store.events.remove({}, { multi: true }, function(error) {
		if (error) {
			return next(error);
		}
		return res.status(200).json({ status_code: 200, body: {} });
	});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
