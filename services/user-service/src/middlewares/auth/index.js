const UserModel = require("@/model/UserModel.js");
const logger = require("@/config/log/index.js");
const authMiddlewareUser = {
    login : async function (req, res, next) {
        // Implement logic to authenticate user
        // Return success or failure message

        try {
            const { username , password} = req.body;

            if (username.includes("'") || password.includes("'")) {
                throw new Error(`Invalid input detected`);
            }
            

            const user = await UserModel.findOne({username});

            next();
        } catch (error) {
            logger.error({ correlationId: req.id }, error.message);
            return res.status(401).send({
                success: false,
                message: error.message
            });
        }
       
    },
    logout : function (req, res, next) {
        // Implement logic to log out user
        // Return success or failure message
    }
    // Add more methods for other authentication requirements if needed
}
module.exports = authMiddlewareUser