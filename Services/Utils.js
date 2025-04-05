import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const hashPassword = async (password) => {
  const salt = parseInt(process.env.SALT_ROUNDS) || 10;
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const getFieldFromQueryParam = (queryParam) => {
  return queryParam.replace("Contains", "");
};

export const parseQueryParam = (value) => {
  if (!isNaN(value) && value !== "") {
    return Number(value);
  }
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  return value;
};

export const queryGen = async (query) => {
  const queryCopy = { ...query };
  const skip = queryCopy.skip;
  const limit = queryCopy.limit;
  delete queryCopy.skip;
  delete queryCopy.limit;

  let keywords = {};
  Object.keys(queryCopy).forEach((queryParam) => {
    if (queryCopy[queryParam]) {
      const field = getFieldFromQueryParam(queryParam);
      const regexSearch = new RegExp(queryCopy[queryParam], "i");

      if (field) {
        if (queryParam.endsWith("Contains")) {
          keywords.$or = keywords.$or || [];
          keywords.$or.push({ [field]: { $regex: regexSearch } });
        } else {
          keywords[field] = parseQueryParam(queryCopy[queryParam]);
        }
      }
    }
  });

  return { keywords, skip, limit };
};
export const withTransaction = async (callback) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await callback(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
