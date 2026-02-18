import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Make sure your env var exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY env var");
}

// Create OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test endpoint
app.get("/test", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Say hello in one short sentence."
    });

    res.json({
      success: true,
      reply: response.output_text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
