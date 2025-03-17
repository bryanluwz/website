import app from "./app";

require("dotenv").config();

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

// https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });

app
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Error occurred while starting the server: ${err.message}`);
  });
