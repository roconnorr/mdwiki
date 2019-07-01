const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

const fs = require("fs");
const marked = require("marked");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  fs.readdir("pages", function(err, items) {
    if (err) {
      res.status(400).send("FS Error, check pages folder " + err);
    } else {
      const pageLinks = items.map(pageFile => {
        const fileName = pageFile.split(".");
        return `<a href="pages/${fileName[0]}">${pageFile}</a>`;
      });

      res.send(pageLinks.join("<br>"));
    }
  });
});

app.get("/api/pages", (req, res) => {
  fs.readdir("pages", function(err, items) {
    if (err) {
      res.status(400).json({ message: "FS Error, check pages folder " + err });
    } else {
      res.json(items);
    }
  });
});

app.get("/pages/:mdFileName", (req, res) => {
  fs.readFile(`pages/${req.params.mdFileName}.md`, "utf8", function(
    err,
    contents
  ) {
    if (err) {
      res.send("FS Error, check md file" + err);
    } else {
      const html = marked(contents);
      res.send(html);
    }
  });
});

app.post("/save", (req, res) => {
  fs.writeFile("pages/testy2.md", req.body.document, err => {
    if (err) {
      res.status(400).send("err");
      return console.log(err);
    }

    res.send("File saved successfully");
    return console.log("The file was saved!");
  });
});

app.listen(port, () => console.log(`markdown-wiki listening on port ${port}!`));
