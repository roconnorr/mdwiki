const fs = require("fs");

exports.page_list = function(req, res) {
  fs.readdir("pages", function(err, items) {
    if (err) {
      res.status(400).json({ error: "FS Error, check pages folder " + err });
    } else {
      res.status(200).json(items);
    }
  });
};

exports.page_detail = function(req, res) {
  fs.readFile(`pages/${req.params.pageId}.md`, "utf8", function(err, contents) {
    if (err) {
      res.status(400).json({ error: "FS Error, check files" + err });
    } else {
      res.status(200).json({ content: contents });
    }
  });
};

exports.page_create = function(req, res) {
  fs.writeFile("pages/testy2.md", req.body.content, err => {
    if (err) {
      res.status(400).json({ error: err });
      console.log(err);
    } else {
      res.status(201).json({ message: "File created successfully" });
      console.log("The file was saved!");
    }
  });
};
