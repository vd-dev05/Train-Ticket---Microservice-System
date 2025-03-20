const redisClient = require('./RedisClient.js');

// Hàm đặt cache với TTL
async function setCache(key, value, ttl = 3600) {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    console.log("💾 Data cached in Redis for key:", key);
  } catch (err) {
    console.error("Error setting cache for key", key, err);
  }
}

// Hàm lấy cache
async function getCache(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error getting cache for key", key, err);
    return null;
  }
}

module.exports = { setCache, getCache };
