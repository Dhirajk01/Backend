import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registeruser = asyncHandler(async (req, res) => {
  // get details of user from frontend
  // validation - fields not empty
  // check for existing user : email,username
  // check for images, check for avatar
  // upload them to cloudinary
  // create user object- create entry in db
  // remove password and refresh token       fields from response
  //check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("email : ", email);

  //   if(fullName===""){
  //     throw new ApiError(400,"fullname is required")
  //   }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username is already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverimageLocalPath = req.files?.coverimage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverimage = await uploadOnCloudinary(coverimageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    email,
    password,
    userName: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong in creating user ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registred sucessfully"));
});

export { registeruser };
