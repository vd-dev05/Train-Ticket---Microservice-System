// moudle-alias
require('module-alias/register');
//  Packages
const express = require("express");
// const dotenv = require('dotenv');
const DataBaseConnectionMongoDB = require("./database");
const pinoHttp = require('pino-http');
const logger = require('./config/log/index.js');
const redisClient = require('./cache/RedisClient.js');
const RootRouter = require("@/routes/index.js");


// Configuration
require('dotenv').config();
const PORT = process.env.PORT || 3000;




const app = express();
app.use(express.json());
// Middleware để tạo correlation ID và log request/response
// app.use(pinoHttp({ logger }));

// Routes
app.use(RootRouter);

// get Users
// app.get('/users/:id', async (req, res) => {
   
    
//     try {
//         const { id } = req.params;
     
        
//       // Kiểm tra cache Redis: Thử lấy dữ liệu user từ Redis bằng key là id
//       const cachedUser = await getCache(id);
//       if (cachedUser) {
//         console.log("🔄 Serving from Redis cache");
//         // Nếu có dữ liệu trong cache, chuyển đổi JSON từ chuỗi thành đối tượng và trả về
//         return res.json(JSON.parse(cachedUser));
//       }
  
//       // Nếu không có dữ liệu cache, truy vấn MongoDB để lấy thông tin user theo id
//     //   const userId = new mongoose.Types.ObjectId(id);
     
//       const user = await User.findById(id);

      
//       if (user) {
//         // Khi tìm thấy user từ MongoDB, lưu kết quả vào Redis với thời gian tồn tại 1 giờ (3600 giây)
//         await redisClient.setEx(id, 3600, JSON.stringify(user));
//         console.log("💾 User cached in Redis");
//         return res.json(user);
//       } else {
//         // Nếu không tìm thấy user, trả về mã 404
//         return res.status(404).json({ error: "User not found" });
//       }
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       // Nếu có lỗi xảy ra trong quá trình truy xuất, trả về mã lỗi 500
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
  
// app.get("/", (req, res) => {
//     // req.log.info({ correlationId: req.id }, 'Processing request for /');
//     res.send("User Service Microservice is running successfully!");
// });

app.listen(PORT , () => console.log(`User Service running on port ${PORT}`));

// Connect to Redis
// // const redisClient = redis.createClient({ url: "redis://redis:6379" });
// redisClient.connect()
// .then(() => console.log("Connected to Redis successfully"))
// .catch((error) => console.error("Redis connection error:", error)); 


// Connect to MongoDB
DataBaseConnectionMongoDB();

