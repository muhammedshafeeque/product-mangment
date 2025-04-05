import Joi from "joi";

export const ManufactureSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
  })
};