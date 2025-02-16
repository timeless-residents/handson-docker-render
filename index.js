const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// グレースフルシャットダウンの処理
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Performing graceful shutdown...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Performing graceful shutdown...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
