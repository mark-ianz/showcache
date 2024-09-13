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
