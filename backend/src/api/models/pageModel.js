const fs = require("fs");
const uuidv4 = require("uuid/v4");

let redisClient;

module.exports.setRedisClient = client => (redisClient = client);

class Page {
  constructor(name, content) {
    this.id = uuidv4();

    // set defaults if none are provided
    if (typeof name === "undefined" || name === null || name === "") {
      // TODO: Improve validation
      name = `Unnamed page`;
    }

    if (typeof content === "undefined" || content === null) {
      content = "";
    }

    this.name = name;
    this.fileName = `${name} ${this.id}`;
    this.content = content;
  }

  async save() {
    // TODO add proper error handling

    //Save Page to Redis
    redisClient.hmset(
      `page:${this.id}`,
      [
        "id",
        this.id,
        "name",
        this.name,
        "fileName",
        this.fileName,
        "content",
        this.content
      ],
      (err, res) => {
        if (err) {
          console.log(`Error saving page to redis ${err}`);
        } else {
          console.log(`Save page to redis ${res}`);
        }
      }
    );

    // write page data to filesystem
    fs.writeFile(`pages/${this.fileName}`, this.content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });
  }

  static async getById(id) {
    console.log("get from redis");
  }

  static async getAll() {
    // get keys of all pages
    const keys = await redisClient.keys("page*");

    // get all page objects
    const multi = redisClient.multi();
    keys.forEach(key => multi.hgetall(key));
    const results = await multi.exec();

    // remove null objects from array where errors would be
    // TODO error handling here
    return results.map(result => result[1]);
  }
}

module.exports.Page = Page;
