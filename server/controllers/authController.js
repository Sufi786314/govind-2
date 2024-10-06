import userModel from '../models/userModel.js';
import { ComparePassword, hashPassword } from '../helpers/authHelper.js';
import  jwt  from 'jsonwebtoken';


import userModel from '../models/User.js'; // Make sure to adjust the path as needed
import { hashPassword } from '../utils/hash.js'; // Assume you have a utility to hash passwords

export const registerController = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            uid,
            rollNumber,
            department,
            year,
            division,
            gender,
        } = req.body;

        // Validations
        if (!username) {
            return res.status(400).send({ success: false, message: 'Username is required' });
        }
        if (!email) {
            return res.status(400).send({ success: false, message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ success: false, message: 'Password is required' });
        }
        if (!uid) {
            return res.status(400).send({ success: false, message: 'UID is required' });
        }
        if (!rollNumber) {
            return res.status(400).send({ success: false, message: 'Roll number is required' });
        }
        if (!department) {
            return res.status(400).send({ success: false, message: 'Department is required' });
        }
        if (!year) {
            return res.status(400).send({ success: false, message: 'Year is required' });
        }
        if (!division) {
            return res.status(400).send({ success: false, message: 'Division is required' });
        }
        if (!gender) {
            return res.status(400).send({ success: false, message: 'Gender is required' });
        }

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already registered, please log in',
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new userModel({
            username,
            email,
            password: hashedPassword,
            uid,
            rollNumber,
            department,
            year,
            division,
            gender,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: {
                username: user.username,
                email: user.email,
                uid: user.uid,
                rollNumber: user.rollNumber,
                department: user.department,
                year: user.year,
                division: user.division,
                gender: user.gender,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error during registration',
            error: error.message || 'Server Error',
        });
    }
};


// POST LOGIN
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user = await userModel.findOne({email})
        // check user
        if (!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }
        const match = await ComparePassword(password,user.password) 
        // password Compare
        if (!match){
            return res.status(200).send({
                success:false,
                message:"Incorrect Password"
            })
        }
        // Token
        const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:"User Logged In Successfully",
            user:{
                username:user.username,
                email:user.email,
            },token,
        })
    }
    catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};


// ForgotPaswordController || Post
export const forgotPasswordController = async (req,res)=>{
    try{
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:'Email is Required'})
        }
        if(!answer){
            res.status(400).send({message:'Answer is Required'})
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is Required'})
        }
        // check
        const user = await userModel.findOne({email,answer})
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer '
            })
        }
        // make newpassword as hash password in order to store using hashpassword
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })

    }
    catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went Wrong",
            error
        })
    }
}

// GEt || TEst Controller
export const testController = async (req,res) => {
    res.send("Protected Routes  ");
};