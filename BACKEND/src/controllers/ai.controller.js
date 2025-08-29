const { generateContent } = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await generateContent(code);
    res.status(200).json({ response });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};
