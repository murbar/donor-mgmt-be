const db = require('./db');

module.exports = {
  getAll() {
    return db('donor');
  },
  getById(id) {
    return db('donor')
      .where('id', id)
      .first();
  }
};
