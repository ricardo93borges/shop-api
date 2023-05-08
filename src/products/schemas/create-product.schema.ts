import * as Joi from 'joi';

export const createProductSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().max(45).required(),
  description: Joi.string().max(245).required(),
});
