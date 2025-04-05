import { PROFILES } from "../Models/ProfileModal.js";
import { SELLERS } from "../Models/SellerModal.js";
import { USERS } from "../Models/userModal.js";
import { hashPassword, comparePassword, generateToken } from "../Services/Utils.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, userType, address, phone } = req.body;
    const existingUser = await USERS.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await USERS.create({ name, email, password: hashedPassword});
    const profile = await PROFILES.create({ user: user._id, userType,name,email,address,phone });
    if(userType === "seller"){
      const seller = await SELLERS.create({ user: user._id, name, email, address, phone,profile:profile._id });
      profile.seller = seller._id;
    }

    res.status(201).json({
    message: "User registered successfully",
    profile,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await USERS.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    let profile = await PROFILES.findOne({ user: user._id });
    res.status(200).json({
      message: "User logged in successfully",
      token,
      profile,
    });
  } catch (error) {
    next(error);
  }
};