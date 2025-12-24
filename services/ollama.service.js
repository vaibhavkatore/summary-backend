const axios = require("axios");

module.exports = async function askOllama(context, question) {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "phi3:mini",
    stream:false,
     options: {
      num_predict: 200 // 🔥 LIMIT OUTPUT
    },
    prompt: `
Answer ONLY from the context below.
If not found, say "Not available in document".

Context:
${context}

Question:
${question}
`
  });
  return res.data.response;
};
