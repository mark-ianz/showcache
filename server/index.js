import express from "express";
import "dotenv/config";
import cors from "cors";
import axios from "axios";

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

  const response = await axios.get(url, options);
  res.send(response);
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

  try {
    const { data } = await axios.get(url, options);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Error" });
  }
});

app.get("/trending", async (req, res) => {
  const { date } = req.query;

  const url = `https://api.themoviedb.org/3/trending/movie/${date}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgxZWI2MTg4ZDM0MWMyNTQ0YWEwYjZkZjQ0YTk4OSIsIm5iZiI6MTcyNjIyOTg0NS4zMDAzNDQsInN1YiI6IjY2ZTQyYzQzZjQ2N2MyYWQ2MmY5N2YxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5w-qePuDD6F-VTAj4eVhQiowd1d0g-z08lEf-7iYP3M",
    },
  };
  const { data } = await axios.get(url, options);
  return res.status(200).json(data);
});
