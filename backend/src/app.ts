import express from "express";
import ChatRouter from "./routes/chatRoutes";
import cors from "cors";
import DashboardRouter from "./routes/dashboardRoutes";
import AuthRouter from "./routes/authRoutes";
import UserRouter from "./routes/userRoute";
import PersonaRouter from "./routes/personaRoutes";
import path from "path";
import fs from "fs";
import mime from "mime-types";

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
