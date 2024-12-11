import { ObjectId } from 'mongodb';

/**
 * Basic utilities module
 */

const basicUtils = {
  /**
     * isValidId Check if ID is Valid in Mongo
     * @param {string} id id to evaluate
     * @returns {boolean} true if valid, false otherwise
     */

  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

export default basicUtils;
