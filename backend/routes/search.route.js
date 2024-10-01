import express from 'express';
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from '../controller/search.controller.js';

const searchRoute = express.Router()

searchRoute.get("/person/:query", searchPerson)
searchRoute.get("/movie/:query", searchMovie)
searchRoute.get("/tv/:query", searchTv)

searchRoute.get("/history", getSearchHistory)
searchRoute.delete("/history/:id", removeItemFromSearchHistory)


export default searchRoute