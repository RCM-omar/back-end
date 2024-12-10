import Joi from "joi";
export const personSchema = Joi.object({
  birth_date: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  nationality: Joi.string().max(255).optional(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .optional(),
  marital_status: Joi.string()
    .valid("single", "married", "divorced", "widowed")
    .optional(),
  address_line: Joi.string().max(255).optional(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(255).optional(),
  district: Joi.string().max(255).optional(),
  state: Joi.string().max(255).optional(),
  postal_code: Joi.string().max(20).optional(),
  country: Joi.string().max(255).optional(),
  occupation: Joi.string().max(255).optional(),
  mrn: Joi.string().max(255).optional(),
  first_name: Joi.string().max(255).required(),
  middle_name: Joi.string().max(255).optional(),
  last_name: Joi.string().max(255).required(),
  religion: Joi.string().max(255).optional(),
  identifier_system: Joi.string().max(255).optional(),
  identifier_type: Joi.string().max(255).optional(),
  identifier_value: Joi.string().max(255).optional(),
 
  // created_by: Joi.number().integer().required(),
  // modified_by: Joi.number().integer().optional(),
  // modification_date: Joi.date().optional(),
});


