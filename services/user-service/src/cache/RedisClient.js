const redis = require("redis");

// Tạo client với URL từ biến môi trường hoặc giá trị mặc định
// Connect to Redis
// console.log(process.env.REDIS_URL);

const redisClient = redis.createClient({
    url: "redis://redis:6379"
  });
  
redisClient.connect()
    .then(() => console.log("✅ Redis connected"))
    .catch((err) => console.error("❌ Redis connection error:", err));
  
  module.exports = redisClient;