
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../data/vectors.json");

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

function loadVectors() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveVectors(vectors) {
  fs.writeFileSync(FILE, JSON.stringify(vectors, null, 2));
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}

module.exports = { loadVectors, saveVectors, cosineSimilarity };
