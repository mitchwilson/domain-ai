import express from "express";
import OpenAI from "openai";


import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());


// CORS for dev only
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

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


// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

async function askOpenAI(question) {
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
    messages: [{ role: 'user', content: question }],
  });
  return response.choices[0].message.content;
}


// API endpoint to ask a question to OpenAI
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question in request body' });
  }
  try {
    const answer = await askOpenAI(question);
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});