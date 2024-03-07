import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../model/user.model.js";
const verifyUser = asyncHandler(async (req, res) => {
  //   console.log(req.cookies.accessToken);
  const jwtToken = req.cookies.accessToken;
  const decodedDetails = await jsonwebtoken.verify(
    jwtToken,
    process.env.JWT_SECRET
  );
  //   console.log(decodedDetails);
  const foundUser = await User.findOne({ _id: decodedDetails.id });
  if (!foundUser) {
    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { message: "unauthorized user", status: false },
          "failed"
        )
      );
  } else {
    res
      .status(200)
      .send(new ApiResponse(200, { message: "authorized user", status: true }));
  }
});
const logOutUser = asyncHandler(async (req, res) => {
  const jwtToken = req.cookies.accessToken;
  const decodedDetails = await jsonwebtoken.verify(
    jwtToken,
    process.env.JWT_SECRET
  );
  //   console.log(decodedDetails);
  const foundUser = await User.findOne({ _id: decodedDetails.id });
  if (!foundUser) {
    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { message: "unauthorized user", status: false },
          "failed"
        )
      );
  } else {
    res
      .status(200)
      .clearCookie("accessToken")
      .send(
        new ApiResponse(200, {
          message: "userLogOut successfully",
          status: true,
        })
      );
  }
});
export { verifyUser,logOutUser };
