const fs = require("fs");
const multer = require("multer");
const pdfParse = require("pdf-parse").default || require("pdf-parse");// ✅ correct import
const { v4: uuid } = require("uuid");

const chunkText = require("../utils/chunkText");
const embedText = require("../services/embedding.service");
const { loadVectors, saveVectors } = require("../services/vector.service");

const router = require("express").Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // 1️⃣ Read uploaded file
    const buffer = fs.readFileSync(req.file.path);

    // 2️⃣ Parse PDF
    const pdfData = await pdfParse(buffer); // returns { text, info, metadata }

    // 3️⃣ Split into chunks
    const chunks = chunkText(pdfData.text);

    // 4️⃣ Generate embeddings in parallel
    const embeddings = await Promise.all(chunks.map(embedText));

    // 5️⃣ Load existing vectors
    const vectors = loadVectors();

    // 6️⃣ Save new chunks
    chunks.forEach((chunk, i) => {
      vectors.push({
        id: uuid(),
        content: chunk,
        embedding: embeddings[i]
      });
    });

    saveVectors(vectors);

    // 7️⃣ Delete temp uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Document uploaded & indexed",
      chunks: chunks.length
    });
  } catch (err) {
    console.error("Upload route error:", err.message || err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

module.exports = router;
