const axios = require("axios");

module.exports = async function embedText(text) {
  const res = await axios.post("http://localhost:11434/api/embeddings", {
    model: "nomic-embed-text",
    prompt: text
  });
  return res.data.embedding;
};
