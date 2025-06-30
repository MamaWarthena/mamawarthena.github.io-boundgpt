const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const configuration = new Configuration({
  apiKey: process.env.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,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "BoundGPT has encountered a darkness..." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BoundGPT lives at http://localhost:${PORT}`));
const openaiApiKey = process.env.OPENAI_API_KEY;
