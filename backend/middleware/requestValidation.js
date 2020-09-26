import Joi from 'joi';

module.exports = {
  update: {
    body: Joi.object().keys({
      url_img: Joi.string().allow(''),
      _id: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  product: {
    body: Joi.object().keys({
      url_img: Joi.string().allow(''),
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
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{1,30}/).required(),
    }),
  },

};
