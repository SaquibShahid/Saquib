const responseSecurity=require("../../middleware/response.security");
const userModel = require("../../models/user.model");
const getCurrentDateWithTime = require("../../module/currentTime.module");
const getUid = require("../../module/uid.module");
const authValidation = require("../../validation/auth.validation")
const jwt = require('jsonwebtoken');

exports.handleAutoLogin=async(req,res)=>{
     try{
    const result=authValidation.autoLoginSchema.validate(req.body)
        if(result.error){
            return responseSecurity.sendResp(req,res,{
                status: "error",
                message: result.error.message,
                responseCode: 500,
                data: null,
            })
        }
    const {userId,password,mobileNo}=req.body;
    const isValidUser=await userModel.findOne({_id:userId,mobileNo:mobileNo,password:password}).select({_id:1,status:1})
        if(isValidUser===null){
            return responseSecurity.sendResp(req,res,{
                status:'error',
                message:"enter valid user details",
                responseCode:500,
                data:null,
                })
        }
        if(isValidUser.status===2){ //DEACTIVE USER
            return responseSecurity.sendResp(req,res,{
                status:'error',
                message:"you are not active user",
                responseCode:500,
                data:null,
                })
        }
        let updatedUserData={
            password:getUid(),
            sessionId:getUid(),
            lastLogin:getCurrentDateWithTime()
        };
        const updateUserInDb=await userModel.findByIdAndUpdate(userId,{
            $set:updatedUserData
        },{new:true}).populate({path:"appLanguage",select:{__v:0}})
        .populate({path:"newsLanguage",select:{__v:0}}).select({_id:1})
        if(updateUserInDb===null){
            return responseSecurity.sendResp(req,res,{
                status:'error',
                message:"something wrong...",
                responseCode:500,
                data:null,
                })
        }
        const token=jwt.sign({userId:userId,sessionId:updatedUserData.sessionId},process.env.JWT_SECRET_KEY)
           if (token === null) {
            responseSecurity.sendResp(req, res, {
              status: "error",
              message: "Something went wrong",
              responseCode: 500,
              data: null,
            });
            return;
          }
        res.setHeader("Authorization", token);
        return responseSecurity.sendResp(req,res,{
            status:'success',
            message:"login successfully",
            responseCode:200,
            data:{
                _id:userId,
                password:updatedUserData.password,
                mobileNo:mobileNo,
                appLanguage:updateUserInDb.appLanguage,
                newsLanguage:updateUserInDb.newsLanguage
            },
            })
     } catch (error) {
        return responseSecurity.sendResp(req,res,{
        status:'error',
        message:error.message,
        responseCode:500,
        data:null,
        })
    }
}