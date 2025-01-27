chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "textSelected") {
    console.log("Background received selected text:", message.text);
    // Perform additional actions here
  }
});
