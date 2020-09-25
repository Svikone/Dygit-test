import Joi from 'joi';

module.exports = {
  product: {
    body: Joi.object().keys({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  signIn: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{1,30}/).required(),
    }),
  },
  signUp: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{1,30}/).required(),
    }),
  },

};
