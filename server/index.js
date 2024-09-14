import express from "express";
import "dotenv/config";
import cors from "cors";
import axios from "axios";
import { get_options } from "./utils/constants";

const app = express();
app.use(cors());

app.listen(3000);

app.get("/", async (req, res) => {
  const url = "https://api.themoviedb.org/3/authentication";
  const { data } = await axios.get(url, get_options);
  res.json(data);
});

app.get("/popular", async (req, res) => {
  const { page = 1 } = req.query;
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + page;
  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Error" });
  }
});

app.get("/trending", async (req, res) => {
  const { date } = req.query;

  const url = `https://api.themoviedb.org/3/trending/movie/${date}?language=en-US`;

  const { data } = await axios.get(url, get_options);
  return res.status(200).json(data);
});
