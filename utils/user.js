import redisClient from './redis';
import dbClient from './db';
import basicUtils from './basic';

/**
 * Module for user utilities
 */

const userUtils = {
  /**
     * getUserIdAndKey Gets a user id and key of redis from request
     * @param {object} request req object
     * @return {object} userid and redis key
     */
  async getUserIdAndKey(request) {
    const token = request.header('X-Token');
    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    return { userId, key };
  },

  /**
     * getUser Gets a user from the database
     * @param {object} request req object
     * @return {object} user object
     */
  async getUser(request) {
    const { userId } = await this.getUserIdAndKey(request);
    if (!basicUtils.isValidId(userId)) return null;
    const user = await dbClient.users.findOne({ _id: basicUtils.ObjectId(userId) });
    return user;
  },
};

export default userUtils;
