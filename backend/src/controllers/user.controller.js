import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword } from "../utils/hashPas.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = async (id) => {
  const foundUser = await User.findOne({ _id: id });
  const token = jwt.sign(
    { id: foundUser._id, userName: foundUser.userName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRY }
  );
  return token;
};
const registerUser = asyncHandler(async (req, res, next) => {
  //   console.log(req.body);
  const { userName, password, email } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res
        .status(400)
        .send(
          new ApiResponse(400, { message: "user already exist" }, "failed")
        );
    } else {
      const hashPass = await hashPassword(password);
      const registeredUser = await User.create({
        userName,
        email,
        password: hashPass,
      });
      res.status(201).send(new ApiResponse(200, { registeredUser }));
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send(
        new ApiResponse(500, { message: "internal server error" }, "failed")
      );
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // console.log(req.cookies);
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res
        .status(400)
        .send(
          new ApiResponse(500, { message: "invalid credentials" }, "failed")
        );
    } else {
      const matchedPass = await bcryptjs.compare(password, foundUser.password);
      if (matchedPass) {
        const token = await generateAccessToken(foundUser._id);
        res
          .status(200)
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .send(new ApiResponse(200, { message: "logged in successfully" }));
      } else {
        res
          .status(500)
          .send(
            new ApiResponse(
              500,
              { message: "invalid password or password" },
              "failed"
            )
          );
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        new ApiResponse(500, { message: "internal server error" }, "failed")
      );
  }
});
export { registerUser, loginUser };
