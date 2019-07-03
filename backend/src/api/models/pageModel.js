const uuidv4 = require("uuid/v4");

let redisClient;

module.exports.setRedisClient = client => (redisClient = client);

class Page {
  constructor(name, content) {
    this.id = uuidv4();
    this.name = name;
    this.content = content;
  }

  async save() {
    console.log("save 2 redis");
  }

  async getById() {
    console.log("get from redis");
  }
}

module.exports.Page = Page;
