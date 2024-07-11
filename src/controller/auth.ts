import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/User";
import dotenv from "dotenv";
import { SECRET } from "../config/db";
import { Request, Response } from "express";
import { Types } from "mongoose";
dotenv.config();

//@desc REGISTER USER
//@route POST /api/users/register
//@access PRIVATE
export const register = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  if (!fname && !lname && !email && !password) {
    res.status(400).json({
      msg: "Please fill out all fields",
    });
  }

  if (!fname) {
    res.status(400).json({
      msg: "First name is required!",
    });
  }

  if (!lname) {
    res.status(400).json({
      msg: "Last name is required!",
    });
  }

  if (!email) {
    res.status(400).json({
      msg: "Email is required!",
    });
  }

  if (!password) {
    res.status(400).json({
      msg: "Password is required!",
    });
  }

  // check if email exists

  const isUserExists = await userModel.find({ email });

  if (isUserExists.length) {
    res.status(400).json({
      msg: "User exists!",
      isSuccess: false,
    });
  } else {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // register

    const user = await userModel.create({
      firstName: fname,
      lastName: lname,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      const uid: Types.ObjectId = user._id;
      res.status(201).json({
        _id: user._id,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        isSuccess: true,
        token: generateToken(uid),
      });
    } else {
      res.status(400).json({
        msg: "Invalid User Data!",
        isSuccess: false,
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if existing
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const uid: Types.ObjectId = user._id;
    res.status(201).json({
      _id: user._id,
      fname: user.firstName,
      lname: user.lastName,
      email: user.email,
      isSuccess: true,
      token: generateToken(uid),
    });
  } else {
    res.status(400).json({
      msg: "Invalid Credentials",
      isSuccess: false,
    });
  }
};

const generateToken = (id: Types.ObjectId) =>
  jwt.sign({ id }, SECRET, { expiresIn: "1d" });

export default { register, login };
