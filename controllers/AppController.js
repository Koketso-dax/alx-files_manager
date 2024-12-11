import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
     * getStatus  - returns the status of the application
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The status of the application
     */
  static getStatus(_req, res) {
    return res.status(200).send({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  /**
     * getStats - returns the statistics of the application
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The statistics of the application
     */
  static async getStats(_req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.status(200).send({ users, files });
  }
}

export default AppController;
