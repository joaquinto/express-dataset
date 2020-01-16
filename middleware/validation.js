const Joi = require("joi");
const validator = require("../helpers/validator");
const validationRules = require("../helpers/validationRules");

const validateEvent = (req, res, next) => {
  const schema = Joi.object().keys({
    id: validationRules.id,
    type: validationRules.type,
    actor: {
      id: validationRules.id,
      login: validationRules.login,
      avatar_url: validationRules.avatar_url,
    },
    repo: {
      id: validationRules.id,
      name: validationRules.name,
      url: validationRules.url,
    },
    created_at: validationRules.created_at,
  });

  const data = {
    id: req.body.id,
    type: req.body.type,
    actor: {
      id: req.body.actor.id,
      login: req.body.actor.login,
      avatar_url: req.body.actor.avatar_url,
    },
    repo: {
      id: req.body.repo.id,
      name: req.body.repo.name,
      url: req.body.repo.url,
    },
    created_at: req.body.created_at,
  }

  const error = validator.joiValidator(data, schema);
  if (!error) {
    return next();
  }
  return res.status(400).json({ status_code: 400, error: error });
}

const validateActor = (req, res, next) => {
  const schema = Joi.object().keys({
    id: validationRules.id,
    login: validationRules.login,
    avatar_url: validationRules.avatar_url,
  });

  const error = validator.joiValidator(req.body, schema);
  if (!error) {
    return next();
  }
  return res.status(400).json({ status_code: 400, error: error });
}

const validateId = (req, res, next) => {
  const actorID = validationRules.id;

  const error = validator.joiValidator(req.params.actorID, actorID);
  if (!error) {
    return next();
  }
  return res.status(400).json({ status_code: 400, error: error });
}

module.exports = {
  validateEvent: validateEvent,
  validateActor: validateActor,
  validateId: validateId,
}
