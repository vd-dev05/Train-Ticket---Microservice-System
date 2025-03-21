const logger = require("@/config/log/index.js");
const userSevices = require("@/services/user/userServices.js");
const authUser = {
    login: (req, res) => {
        // Implement logic to authenticate user
        // Return success or failure message
        try {
            // Authenticate user logic here
            const data = req.body
            // Check Middleware

            userSevices.login(data).then(function (result) {
                res.send(result);
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
                if (result.accessToken) {
                    // const key =  `users:profile:${ req.data.username}${result.}`

                    return res.status(201).send({
                        success: true,
                        message: "User created successfully",
                        result: result
                    });
                }
                // console.log(result);
                //    const key = `users:profile:${ req.data.username}${result.}`;
                //                     await setCache(key, JSON.stringify({
                //                         _id: user._id,
                //                         email: user.email,
                //                         username: user.username,
                //                         name : user.name
                //                     }), 3600);
                    // return res.status(201).send({
                    //     success: true,
                    //     message: "User created successfully",
                    //     // result: result
                    // });
                })
            }

        } catch (error) {
            logger.error({ correlationId: req.id }, error.message);
            res.status(500).send({ message: 'An error occurred while signing up user' });
        }
    }
}

module.exports = authUser;