document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    execute(selectedText);
  }
});

function execute(text) {
  console.log("Selected text:", text);
  // Your custom logic here
}
