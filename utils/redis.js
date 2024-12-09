/**
 * RedisClient - js redis client class
 */
import redis from 'redis';
import { promisify } from 'util';

/**
 * Class for interacting with redis
 */

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  /**
   * isAlive - check if redis client is connected
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * gets value for given key
   * @param {string} key key to get value for
   * @returns {string} value for given key
   */
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  /**
   * Assigns value to key in redis
   * @param {string} key key assorciated with value
   * @param {string} value value to be assigned
   * @param {number} duration TTL of key
   */
  async set(key, value, duration) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    return setAsync(key, duration, value);
  }

  /**
   * Deletes value associated with key
   * @param {string} key of value to delete
   */
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
