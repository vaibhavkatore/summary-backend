module.exports = function chunkText(text, size = 800, overlap = 100) {
  const words = text.split(" ");
  let chunks = [];
  let start = 0;

  while (start < words.length) {
    chunks.push(words.slice(start, start + size).join(" "));
    start += size - overlap;
  }
  return chunks;
};
