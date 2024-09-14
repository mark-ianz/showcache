import express from "express";
import "dotenv/config";
import cors from "cors";
import axios from "axios";
import { get_options } from "./utils/constants.js";

const app = express();
app.use(cors());

app.listen(3000);

app.get("/", async (req, res) => {
  const url = "https://api.themoviedb.org/3/authentication";
  const { data } = await axios.get(url, get_options);
  res.json(data);
});

app.get("/popular", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`;
  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Error" });
  }
});

app.get("/trending", async (req, res) => {
  const { date = "week", language } = req.query;

  const url = `https://api.themoviedb.org/3/trending/movie/${date}?language=${language}`;

  const { data } = await axios.get(url, get_options);
  return res.status(200).json(data);
});

app.get("/new_releases", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=${language}&page=${page}`;

  const { data } = await axios.get(url, get_options);
  return res.status(200).json(data);
});

app.get("/upcoming", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=${page}`;
  const { data } = await axios.get(url, get_options);
  return res.status(200).json(data);
});

app.get("/tv_shows", async (req, res) => {
  // default: top rated
  const { page = 1, language, sort = "top_rated" } = req.query;
  const url = `https://api.themoviedb.org/3/tv/${sort}?language=${language}&page=${page}`;
  const { data } = await axios.get(url, get_options);
  return res.status(200).json(data);
});
