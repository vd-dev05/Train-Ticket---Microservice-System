const jwt = require("jsonwebtoken");
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_USERS
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_USERS
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME 
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME

module.exports = {
    generateAccessToken: (payload) => {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_LIFETIME,
        });
    },
    generateRefreshToken: (payload) => {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_LIFETIME,
        });
    },
    verifyToken : (token , type ) => {
        return jwt.verify(token, type === 'access'? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET);
    }
}
