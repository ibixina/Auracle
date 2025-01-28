document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    execute(selectedText);
  }
});

const API_KEY = localStorage.getItem("API_KEY_GEMINI");
// Test

function execute(text) {
  console.log("Selected text:", text);
  // Your custom logic here
  run(text);
}

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction:
    "You will return the response in a <div> tag in html.You will be given a text. Your job is to create a short and concise summary of the text. After the summary, you will provide a bulleted list of the most important points of the text. After that, you will explain the text in a more digestible and easier to understand manner.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  history: [],
});

async function run(message) {
  const result = await chatSession.sendMessage(message);
  console.log(result.response.text());
  answerContainer.innerHTML = result.response.text();
  answerContainer.style.display = "block";
}

const answerContainer = document.createElement("div");
answerContainer.id = "answerSumm";
answerContainer.style.display = "none";
answerContainer.style.position = "fixed";
answerContainer.style.bottom = "0";
answerContainer.style.left = "0";
answerContainer.style.width = "25%";
answerContainer.style.backgroundColor = "#000";
answerContainer.style.opacity = "0.8";
answerContainer.style.color = "#fff";
answerContainer.style.padding = "10px";
answerContainer.style.zIndex = "99999999";
answerContainer.style.borderRadius = "5px";
answerContainer.style.maxHeight = "33%";
answerContainer.style.overflow = "scroll";
document.body.appendChild(answerContainer);

document.addEventListener("click", (e) => {
  if (e.target.id === "answerSumm") {
    answerContainer.style.display = "none";
  }
});
