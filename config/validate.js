const joi = require("@hapi/joi");

const validateVolunteer = (data) => {
  const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    telephone: joi.number(),
    bio: joi.string(),
    interests: joi.array(),
    password: joi.string().min(8).required(),
  });

  return userSchema.validate(data);
};

const validateNGO = (data) => {
  const schema = joi.object({
    organisationName: joi.string().required(),
    email: joi.string().email().required(),
    telephone: joi.number(),
    description: joi.string(),
    website: joi.string(),
    password: joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports = { validateVolunteer, validateNGO };
