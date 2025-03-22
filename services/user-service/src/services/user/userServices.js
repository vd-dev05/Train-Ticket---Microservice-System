const UserModel = require("@/model/UserModel.js");
const mongoose = require('mongoose');
const { generateAccessToken , generateRefreshToken ,  verifyToken , decodeToken } = require('@/utils/jwt.js');
const userSevices = {
    login: (data) => {

        // Call user service API to login
        // Return promise
        // Fake promise production
        return new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                // console.log(data);
                // const checkToken = verifyToken(data,"access_token");
                
                // if (checkToken === null) {
                //     reject({
                //         success : false,
                //         message : 'Invalid token or token timed out',
                //         status : 401
                //     });
                // } 
                const payloadDecodeToken = decodeToken(data)
                console.log(payloadDecodeToken );
                
                // resolve(data);
                // if(data.username === 'admin' && data.password === 'secret'){
                //     resolve({token: 'admin-token'});
                // } else {
                //     reject('Invalid username or password');
                // }
            }, 1000);
        });
    },
    signup:  (data) => {
        return  new Promise(async (resolve, reject) => {
            // Simulate API call
            // fake promise production
            console.log(data);
            
            setTimeout(async () => {
                const user = await UserModel.create(data);
                const payloadToken = {
                    id: user._id,
                    username: user.username,
                    role : user.role,
                    status : user.status,
                    fullName : user.fullName
                }
                // Generate access and refresh token performed
                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(payloadToken),
                    generateRefreshToken(payloadToken),
                ]);

                const [pushRefreshToken,checkToken] = await Promise.all([
                    user.updateOne({ refreshToken }),
                    verifyToken(refreshToken, "signup")
                ])
                // const  checkToken = verifyToken(refreshToken, "signup")
                // user.refreshToken = refreshToken
                // await user.save();
                // console.log(checkToken);
                if (pushRefreshToken , checkToken) {
                    console.log("Refresh Token updated successfully");
                    resolve({
                        success : true, 
                        message : "User created successfully",
                        accessToken,
                        refreshToken,
                    });
                } else {
                    reject({
                        success : false,
                        message : "Failed to update refresh token"
                    });
                }
              
            }, 1000);
        });
    }
}
module.exports = userSevices