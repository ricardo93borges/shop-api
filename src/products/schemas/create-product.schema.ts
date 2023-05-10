import * as Joi from 'joi';

export const createProductSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().max(45).required(),
  description: Joi.string().max(245).required(),
  quantity: Joi.number().min(0).required(),
  price: Joi.number().integer().min(0).required(),
});
