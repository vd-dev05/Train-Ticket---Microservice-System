const express = require('express');
const logTimeRequest= require('@/middlewares/log/index.js');
const authUser = require('@/controller/user/auth/index.js');
const authMiddlewareUser = require('@/middlewares/auth/index.js');

const usersAuth = express.Router()

// enpoint : http://{url}/api/v1/auth/login
usersAuth.post('/login',logTimeRequest,authMiddlewareUser.login, authUser.login) 
usersAuth.post('/signup',logTimeRequest,authMiddlewareUser.signup, authUser.signup)
module.exports = usersAuth;