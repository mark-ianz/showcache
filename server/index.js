import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(3000);

app.get("/", async (req, res) => {
  const url = "https://api.themoviedb.org/3/authentication";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_ACCESS_TOKEN_AUTH,
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();
  res.send(result);
});

app.get("/popular", async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_ACCESS_TOKEN_AUTH,
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return res.status(200).json(result);
});
