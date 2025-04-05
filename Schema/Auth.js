import Joi from "joi";

export const registerSchema = {
  body: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    userType: Joi.string().valid('customer', 'seller').required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  })
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};