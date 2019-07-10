const fs = require("fs");

const { Page } = require("../models/pageModel");

exports.page_list = async function(req, res) {
  const pages = await Page.getAll();
  res.status(200).json(pages);
};

exports.page_detail = function(req, res) {
  fs.readFile(`/pages/${req.params.pageId}.md`, "utf8", function(err, contents) {
    if (err) {
      res.status(400).json({ error: "FS Error, check files" + err });
    } else {
      res.status(200).json({ content: contents });
    }
  });
};

exports.page_create = async function(req, res) {
  const { name, content } = req.body;

  // create and save page model
  const newPage = new Page(name, content);

  try {
    await newPage.save();
    res.status(201).json({ message: "Page created successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
