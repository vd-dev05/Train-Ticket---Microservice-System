const express = require("express");
const usersAuth = require("./ver1/auth/userRoutesAuth");


const RootRouter = express.Router();



//Auth routes Users
// endpoints : http://{url}/api/v1/auth
RootRouter.use('/api/v1/auth', usersAuth);


module.exports = RootRouter;
