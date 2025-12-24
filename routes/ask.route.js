const express = require("express");

const embedText = require("../services/embedding.service");
const askOllama = require("../services/ollama.service");
const { loadVectors, cosineSimilarity } = require("../services/vector.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;
  const vectors = loadVectors();

  const qEmbed = await embedText(question);

  const context = vectors
    .map(v => ({ ...v, score: cosineSimilarity(qEmbed, v.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(v => v.content)
    .join("\n\n");

  const answer = await askOllama(context, question);
  res.json({ answer });
});

module.exports = router;
