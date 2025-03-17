import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import mime from "mime-types";

require("dotenv").config();

const app = express();

// Connection test from FE
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Nihao from the other sideeeeeeeeeee!",
  });
});

// Host React frontend
let feBuildPath = path.join(
  __dirname,
  process.env.FE_BUILD_PATH || "./frontend/build"
);

app.use(express.static(path.join(feBuildPath)));

app.get("/", (req, res) => {
  console.log("Serving frontend...");
  res.sendFile(path.join(feBuildPath, "index.html"));
});

export default app;
