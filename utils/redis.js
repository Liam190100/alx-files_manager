
import redis from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    });

    // Log errors from Redis client to console
    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    // Redis client value for the specified key
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async del(key) {
    //Redis client to delete the value for the specified key
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;

