import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        try {
            user.refreshToken = refreshToken;
            const savedUser = await user.save({validateBeforeSave: false});
        } catch (error) {
            console.error("Error saving refresh token: ", error);
            throw new ApiError(500, "Failed to save refresh token")
        }

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens")
    }
} 

const registerUser = asyncHandler( async (req, res) => {
    req.body.profpic = JSON.stringify(req.body.profpic.path);
    req.body.gender = req.body.gender.charAt(0).toUpperCase() + req.body.gender.slice(1);
    console.log(req.body);
    
    
    
    const { username, email, password, dateOfBirth, fullname, gender } = req.body;

    if ([username, email, password, dateOfBirth, fullname, gender].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const [day, month, year] = dateOfBirth.split('-').map(num => parseInt(num, 10));

    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }

    const parsedDateOfBirth = new Date(year, month - 1, day+1);

    if (isNaN(parsedDateOfBirth.getTime())) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }
    
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    // const profpicLocalPath = req.files?.profpic[0]?.path;
    // const profpicLocalPath = req.files?.profpic?.path;

    // if(!profpicLocalPath){
    //     throw new ApiError(400, "Profile picture is required")
    // }

    // const profpic = await uploadOnCloudinary(profpicLocalPath);
    // //console.log("profpic: ", profpic);

    // if(!profpic){
    //     throw new ApiError(500, "Failed to upload profile picture")
    // }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        // profpic: profpic.url,
        dateOfBirth: parsedDateOfBirth,
        fullname,
        gender
    })

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler( async (req, res) => {
    const { email, username, password } = req.body;

    if(!username && !email){
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials")
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully")
    )
})

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorised request") 
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(user?.refreshToken !== incomingRefreshToken){
            throw new ApiError(401, "Refresh token is used/expired")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(200,
            {accessToken, refreshToken, newrefreshToken
            },
            "Access token refreshed successfully!")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
        
    }    
})

const changeCurrentPassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id).select("+password");

    if(!user){
        throw new ApiError(404, "User not found")   
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid current password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser = asyncHandler( async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
        200,
        req.user,
        "Current user fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler( async (req, res) => {
    const {username, email, gender, fullname, dateOfBirth} = req.body;

    if(!username || !email){
        throw new ApiError(400, "Username and email are required")
    }

    let updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (fullname) updateFields.fullname = fullname;
    if (dateOfBirth){
        const [day, month, year] = dateOfBirth.split('-').map(num => parseInt(num, 10));

        if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
            throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
        }

        const parsedDateOfBirth = new Date(year, month - 1, day+1);

        if (isNaN(parsedDateOfBirth.getTime())) {
            throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
        }

        updateFields.dateOfBirth = parsedDateOfBirth;
    }

    if (Object.keys(updateFields).length === 0) {
        throw new ApiError(400, "No fields provided to update");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: updateFields
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Account details updated successfully"
        )
    )
})

const updateProfPic = asyncHandler( async (req, res) => {
    const profpicLocalPath = req.file?.path

    if(!profpicLocalPath){
        throw new ApiError(400, "Profile picture is missing")
    }

    const profpic = await uploadOnCloudinary(profpicLocalPath);

    if(!profpic.url){
        throw new ApiError(500, "Failed to upload profile picture")
    }

    console.log(req.user); // Debugging: Log user object
    console.log(profpic);

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profpic: profpic.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Profile picture updated successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateProfPic
}