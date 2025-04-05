import Joi from "joi";
import { pick } from "../Services/Utils.js";

export const validate = (schema) => (req, res, next) => {  
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema).validate(object, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map(detail => detail.message)
      });
    }
    
    Object.assign(req, value);
    return next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error during validation" });
  }
};