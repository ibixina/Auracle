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

const history = [];

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "be concise and accurate. do not hallucinate. verify everything you say. you will be given texts and your job is to summarize them in a digestible manner. depending on the subject, give proper examples and analogies to make it easier to understand. only say what you are fully confident about. do not exlcude any vital information. explain any unfamiliar ideas or terms. explain not just what but also the how.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(message) {
  const chatSession = model.startChat({
    generationConfig,
    history: history,
  });

  const result = await chatSession.sendMessage(message);
  alert(result.response.text());
  console.log(result.response.text());
  history.push(result.response.text());
}
