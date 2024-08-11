const redis = require("redis");
const redisclient = redis.createClient({
    url: 'redis://localhost:6379',
})

module.exports = redisclient;