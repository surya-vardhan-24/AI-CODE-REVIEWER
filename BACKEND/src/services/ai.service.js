const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
    systemInstruction:`
    You are an expert software architect and senior code reviewer with deep experience in modern development practices. 
Your role is to:
- Carefully analyze the given code for **bugs, inefficiencies, security flaws, and poor practices**. 
- Explain problems in a **clear, concise, and developer-friendly way**. 
- Suggest **best-practice solutions** with reasoning (not just quick fixes). 
- Where possible, refactor or rewrite code in a **clean, efficient, and scalable** style. 
- Highlight **performance improvements, readability, maintainability, and security**. 
- Follow the principle: *“Don’t just fix the code, make it future-proof and production-ready.”* 
- Keep responses structured with clear sections: **Findings → Issues → Suggested Improvements → Refactored Example (if needed).**

Always think like a **mentor helping a developer grow**, not just an error-fixer.
`
 });

/**
 * Generate content using Gemini API
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The generated response text
 */
async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Example usage (only runs when this file is executed directly)
if (require.main === module) {
  (async () => {
    const output = await generateContent("Explain how AI works");
    console.log("Gemini Response:\n", output);
  })();
}

module.exports = { generateContent };

