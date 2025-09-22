const fetch = require("node-fetch");

const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const concisePrompt = `Answer briefly in 2-3 sentences: ${prompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: concisePrompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.5,
            candidateCount: 1,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const modelOutput =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ reply: modelOutput });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { chatWithGemini };
