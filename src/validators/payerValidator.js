import Joi from "joi";
export const payerSchema = Joi.object({
  city: Joi.string().max(255).optional(),
  district: Joi.string().max(255).optional(),
  state: Joi.string().max(255).optional(),
  postal_code: Joi.string().max(20).optional(),
  country: Joi.string().max(255).optional(),
  // created_by: Joi.number().integer().required(),
  // modified_by: Joi.number().integer().optional(),
  // modification_date: Joi.date().optional(),
});


