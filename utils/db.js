import { MongoClient } from 'mongodb';
import { promisify } from 'util';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * DBClient - js mongodb client class
 */
class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) {
        console.log(`MongoDB connection error: ${err}`);
      } else {
        console.log('Connected to MongoDB');
      }
    });
  }

  /**
   * isAlive - check if mongodb client is connected
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * nbUsers - count number of documents in users collection
   * @returns {number} number of documents in users collection
   */
  async nbUsers() {
    const users = this.client.db(DB_DATABASE).collection('users');
    const countAsync = promisify(users.countDocuments).bind(users);
    return countAsync({});
  }

  /**
   * nbFiles - count number of documents in files collection
   * @returns {number} number of documents in files collection
   */
  async nbFiles() {
    const files = this.client.db(DB_DATABASE).collection('files');
    const countAsync = promisify(files.countDocuments).bind(files);
    return countAsync({});
  }
}

const dbClient = new DBClient();

export default dbClient;
