const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

// import routes
const routes = require("./src/api/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(port, () => console.log(`markdown-wiki listening on port ${port}!`));
