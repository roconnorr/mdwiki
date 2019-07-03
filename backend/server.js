const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

const redis = require("ioredis");
const redisClient = new redis(process.env.REDIS_URL);

// pass redis client to models
const pageModel = require("./src/api/models/pageModel");
pageModel.setRedisClient(redisClient);

redisClient.on("connect", () => {
  console.log("Redis client connected");

  // import routes
  const routes = require("./src/api/routes");

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/api", routes);

  app.listen(port, () =>
    console.log(`markdown-wiki listening on port ${port}!`)
  );
});

redisClient.on("error", err => {
  console.error("Error connecting to redis, server not started! " + err);
});
