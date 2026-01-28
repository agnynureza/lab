import Joi from'joi';

export const albumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

export const albumUpdatePayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});