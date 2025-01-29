import { basename } from "node:path";
import express from "express";
import { NODE_ENV, PORT } from "./utils/env.config.js";
import { fetchExternalData } from "./service.js";
export const app = express();

app.use(express.json());

let usuarios = [];

// llamada a la ruta de usuarios un array vacio
app.get("/usuarios", (req, res) => {
  res.status(200).json({ usuarios });
});

// llamado a una api externa con data real
app.get("/external-data", async (req, res) => {
  try {
    const data = await fetchExternalData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
});

if (
  basename(import.meta.url) === basename(process.argv[1]) &&
  NODE_ENV !== "test"
) {
  const port = PORT || 3000;

  app.listen(port, () => {
    console.log(`App.js is running on port ${port}, mode: ${NODE_ENV}`);
  });
}
