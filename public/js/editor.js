var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  lineNumbers: true
});

editor.on("change", function (cm) {
  console.log('change');
  document.getElementById('preview').innerHTML = marked(cm.getValue());
})