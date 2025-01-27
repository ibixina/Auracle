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
    "be concise and accurate. do not hallucinate. verify everything you say. you will be given texts and your job is to summarize them in a digestible manner. depending on the subject, give proper examples and analogies to make it easier to understand. only say what you are fully confident about. do not exlcude any vital information. explain any unfamiliar ideas or terms. explain not just what but also the how. the answer should be short and concise.",
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
  answerContainer.innerText = result.response
    .text()
    .replaceAll("`", "")
    .replace("html", "");
  answerContainer.style.display = "block";
}

const answerContainer = document.createElement("div");
answerContainer.id = "answerSumm";
answerContainer.style.display = "none";
answerContainer.style.position = "fixed";
answerContainer.style.bottom = "0";
answerContainer.style.right = "0";
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
