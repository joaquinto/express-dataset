const store = require("../storage/database");
const streak = require("../helpers/streak");

const addActor = (req, res, next) => {
	const actor = {
		"id": req.body.id,
		"login": req.body.login,
		"avatar_url": req.body.avatar_url,
	};
	store.actors.insert(actor, function(error, actor) {
		if (error) {
			return next(error);
		}
		return res.status(201).json({ status_code: 201, body: actor });
	});
};

const getAllActors = (req, res, next) => {
	store.actors.find({}, function(error, actors) {
		if (error) {
			return next(error);
		}
		if (!actors) {
			return res.status(404).json({ status_code: 404, error: new Error('Actors not found') });
		}
		actors.forEach((actor) => {
			delete actor._id;
		});
		return res.status(200).json({ status_code: 200, body: actors });
	});
};

const updateActor = (req, res, next) => {
	store.actors.update({ id: Number(req.body.id) }, { $set: { avatar_url: req.body.avatar_url } }, function(error, actor) {
		if (error) {
			return next(error);
		}
		if (!actor) {
			return res.status(404).json({ status_code: 404, error: new Error('Actor not found') });
		}
		return res.status(200).json({ status_code: 200, body: {} });
	});
};

const getStreak = (req, res, next) => {
	store.events.find({}).sort({ 'actor.login': 1 }).exec(function(error, events) {
		if (error) {
			console.log(error.detail)
			return next(error);
		}
		if (!events.length) {
			return res.status(404).json({ status_code: 404, error: new Error('Actors not found') });
		}
		const actorStreak = streak.streak(events);
		res.status(200).json({ status_code: 200, body: actorStreak });
	});
}

module.exports = {
	addActor: addActor,
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
