const config = require(`./${process.env.OPENAI_WRAPPER_CONFIG || 'config.js'}`);
const { Configuration, OpenAIApi } = require("openai");

// Get the API key from the environment variable
const apiKey = process.env.OPENAI_API_KEY;

// Check if the API key is set
if (!apiKey) {
  console.error('Error: OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.');
  process.exit(1);
}

// Initialize the OpenAI library with the API key
const configuration = new Configuration({ apiKey: apiKey });
const openai = new OpenAIApi(configuration);

// Function to interact with the ChatGPT model
async function interactWithChatGPT(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL,
      messages: [
            { role: 'system', content: config.systemPrompt }, 
            { role: 'user', content: prompt }
        ],
    });

    // Extract the reply from the response
    const reply = response.data.choices[0].message.content;

    return reply;
  } catch (error) {
    console.error('Error interacting with ChatGPT:', error.message || error);
  }
}

module.exports = {
  interactWithChatGPT: interactWithChatGPT
};