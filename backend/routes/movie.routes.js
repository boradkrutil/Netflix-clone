import express from "express"
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from "../controller/movie.controller.js"

const movierouter = express.Router()

movierouter.get("/trending", getTrendingMovie)
movierouter.get("/:id/trailers", getMovieTrailers);
movierouter.get("/:id/details", getMovieDetails);
movierouter.get("/:id/similar", getSimilarMovies);
movierouter.get("/:category", getMoviesByCategory);

export default movierouter