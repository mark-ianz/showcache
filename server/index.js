import express from "express";
import "dotenv/config";
import cors from "cors";
import axios from "axios";
import { get_options } from "./utils/constants.js";
import { throwServerError } from "./utils/helpers.js";

const app = express();
app.use(cors());

app.listen(3000);

app.get("/", async (req, res) => {
  const url = "https://api.themoviedb.org/3/authentication";
  try {
    const { data } = await axios.get(url, get_options);
    res.json(data);
  } catch (error) {
    throwServerError(res);
  }
});

app.get("/popular", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`;
  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    throwServerError(res);
  }
});

app.get("/trending", async (req, res) => {
  const { date = "week", language } = req.query;
  console.log(req.query);

  const url = `https://api.themoviedb.org/3/trending/movie/${date}?language=${language}`;

  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    throwServerError(res);
  }
});

app.get("/new_releases", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=${language}&page=${page}`;

  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    throwServerError(res);
  }
});

app.get("/upcoming", async (req, res) => {
  const { page = 1, language } = req.query;
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=${language}&page=${page}&primary_release_date.gte=${new Date()}&sort_by=popularity.desc`;
  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    throwServerError(res);
  }
});

app.get("/tv", async (req, res) => {
  // default sort: top rated
  // sorts: top_rated, airing_today, popular,on_the_air
  const { page = 1, language, sort = "top_rated" } = req.query;
  const url = `https://api.themoviedb.org/3/tv/${sort}?language=${language}&page=${page}`;
  try {
    const { data } = await axios.get(url, get_options);
    return res.status(200).json(data);
  } catch (error) {
    throwServerError(res);
  }
});
