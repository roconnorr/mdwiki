const fs = require("fs");

exports.page_list = function(req, res) {
  fs.readdir("pages", function(err, items) {
    if (err) {
      res.status(400).json({ message: "FS Error, check pages folder " + err });
    } else {
      res.json(items);
    }
  });
};

exports.page_detail = function(req, res) {
  fs.readFile(`pages/${req.params.pageId}.md`, "utf8", function(err, contents) {
    if (err) {
      res.send("FS Error, check md file" + err);
    } else {
      res.send(contents);
    }
  });
};

exports.page_create = function(req, res) {
  fs.writeFile("pages/testy2.md", req.body.content, err => {
    if (err) {
      res.status(400).send("err");
      console.log(err);
    }

    res.send("File saved successfully");
    console.log("The file was saved!");
  });
};
