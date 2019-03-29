const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const fs = require('fs');
const marked = require('marked');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readdir('pages', function (err, items) {
    const pageLinks = items.map((pageFile) => {
      const fileName = pageFile.split(".");
      return `<a href="pages/${fileName[0]}">${pageFile}</a>`;
    });

    res.send(pageLinks.join('<br>'));
  });
});

app.get('/pages/:mdFileName', (req, res) => {
  fs.readFile(`pages/${req.params.mdFileName}.md`, 'utf8', function (err, contents) {
    const html = marked(contents);
    res.send(html);
  });
});

app.listen(port, () => console.log(`markdown-wiki listening on port ${port}!`));
