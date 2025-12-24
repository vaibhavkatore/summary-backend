const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/upload", require("./routes/upload.route"));
app.use("/api/ask", require("./routes/ask.route"));

app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
