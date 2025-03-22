const logger = require("@/config/log/index.js");
const userSevices = require("@/services/user/userServices.js");
const { setCache} = require('@/cache/cacheHelper.js');
const authUser = {
    login: (req, res) => {
        // Implement logic to authenticate user
        // Return success or failure message
        try {
            // Authenticate user logic here
            // const data = req.body
            const token = req.token
            // Check Middleware
            if (!token) {
                return res.status(401).send({ message: 'Token is required' , status: 401 });
            }
            userSevices.login(token).then(function (result) {
                console.log(result);
                
                // res.send(result);
            }).catch((err) => {
                logger.error({ correlationId: req.id }, err.message);
                res.status(500).send({ message: 'An error occurred while authenticating user' });
            })
            // res.send({ message: 'User Login successfully' });
        } catch (error) {
            logger.error({ correlationId: req.id }, error.message);
            res.status(500).send({ message: 'An error occurred while authenticating user' });
        }
        // res.send({message: 'User authenticated successfully'});
    },
    signup: async (req, res) => {
        try {
            if (req.body.type === "signup_basic") {
             await  userSevices.signup(req.data).then(async (result) => {
                if (result.accessToken && result.success === true) {
                    const key =  `users:profile:${ req.data.username}${req.data.passwordCache }`;
                    setCache(key, result.accessToken, 3600);
                    return res.status(201).send({
                        success: true,
                        message: result.message,
                        accessToken: result.accessToken,
                    });
                } else if (result.success === false) {
                    return res.status(400).send({
                        success: false,
                        message: "User created fail",
                        result: result
                    });
                }
                })
            }

        } catch (error) {
            logger.error({ correlationId: req.id }, error.message);
            res.status(500).send({ message: 'An error occurred while signing up user' });
        }
    }
}

module.exports = authUser;