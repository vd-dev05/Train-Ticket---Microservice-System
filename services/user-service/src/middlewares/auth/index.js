const UserModel = require("@/model/UserModel.js");
const logger = require("@/config/log/index.js");
const { getCache, setCache } = require("@/cache/cacheHelper.js");
const { hashPassword , comparePassword} = require("@/utils/hash");

const authMiddlewareUser = {
    signup : async function (req, res, next) {
        // Implement logic to authenticate user
        // Return success or failure message

        try {
            const {username , password , type , fullname  } = req.body;
            const regex =  /[<>{}()[\];:'"\\/!@#$%^&*=+?]/g; 
        
            if (regex.test(username) || regex.test(fullname) || regex.test(fullname)) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid character in input"
                });
            }
            const checkUserName = await UserModel.findOne({username : username});
            if (!checkUserName && type === "signup_basic") {
                // Encrypt password before saving
                const hashedPassword = await hashPassword(password)
                req.data = {
                    username : username,
                    password : hashedPassword,
                    passwordCache : password, 
                    fullName : fullname,
                }
                
                return next()
            } else {
               throw new Error("Username already exists")
            }
           
        } catch (error) {
            logger.error({ correlationId: req.id }, error.message);
            return res.status(401).send({
                success: false,
                message: error.message
            });
        }
    },
    login: async function (req, res, next) {
        // Implement logic to authenticate user
        // Return success or failure message

        try {
            if (req.body.username.includes("'") || req.body.password.includes("'")) {
                throw new Error(`Invalid input detected`);
            }
            const key = `users:profile:${req.body.username + req.body.password}`
            const cacheUses = await getCache(key);
            // console.log(cacheUses);
            const user = await UserModel.findOne({username : req.body.username });
            if (!cacheUses || cacheUses === null )  {
                if (! user) {
                    throw new Error("Invalid user");
                } else {

                    // const key = `users:profile:${ user.username}${req.body.password}`;
                    // await setCache(key, JSON.stringify({
                    //     _id: user._id,
                    //     email: user.email,
                    //     username: user.username,
                    //     name : user.name
                    // }), 3600);
                    // console.log("💾 Data cached in Redis for key:", key);
                    // req.payload = {
                    //     id: user._id,
                    //     email: user.email,
                    //     username: user.username,
                    //     name : user.name
                    // }
                    next();
                }    
            } else {
                const checkPassword = comparePassword(req.body.password, user.password);
                console.log(checkPassword);
                
                if (!checkPassword) {
                    throw new Error("Invalid password");
                } else {
                    req.token = cacheUses
                    next();
                }
          
                         
            }
            // const cacheUses = await getCache("testKey");
            // console.log(test);
            
            // const key = username + password; // Key để lưu vào Redis
            // const value = { id: "123", name: "Test User", role: "admin" }; // Giá trị là object
            // const ttl = 3600;

            // await  setCache(key, JSON.stringify(value) ,ttl);
            // console.log("💾 Data cached in Redis for key:", key);
            // const key = (username + password).toString();
            // const cacheUses = await getCache({});
            // if (cacheUses) {

            //     console.log("🔄 Serving from Redis cache");
            //     const user = JSON.parse(cacheUses)
            //     console.log(user);

            // } else {

            //     const user = await UserModel.findOne({username});
            //     if (!user) {
            //         throw new Error("Invalid username or password");
            //     }
            //     // console.log(user.username);

            //     // key = user.username + user.password;
            //     const result = await setCache( "admin123", 3600,JSON.stringify(user) )

            //     // console.log(result);

            // }


            // next();
        } catch (error) {


            logger.error({ correlationId: req.id }, error.message);
            return res.status(401).send({
                success: false,
                message: error.message
            });
        }

    },
    logout: function (req, res, next) {
        // Implement logic to log out user
        // Return success or failure message
    }
    // Add more methods for other authentication requirements if needed
}
module.exports = authMiddlewareUser