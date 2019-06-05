var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  lineNumbers: true
});

editor.on("change", function (cm) {
  console.log('change');
  document.getElementById('preview').innerHTML = marked(cm.getValue());
})

async function saveDocument() {
  const document = editor.getValue();
  const result = await fetch("http://localhost:3000/save",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ document: document })
    }
  );
  console.log(result);
}
