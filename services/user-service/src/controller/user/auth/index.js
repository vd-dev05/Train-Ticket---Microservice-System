const logger = require("@/config/log/index.js");
const userSevices = require("@/services/user/userServices.js");
const authUser = {
    login : (req, res) => {
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
    } 
}

module.exports = authUser;