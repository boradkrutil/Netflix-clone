import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers } from '../controller/tv.controller.js';

const tvroutes = express.Router()


tvroutes.get("/trending", getTrendingTv)
tvroutes.get("/:id/trailers", getTvTrailers);
tvroutes.get("/:id/details", getTvDetails);
tvroutes.get("/:id/similar", getSimilarTvs);
tvroutes.get("/:category", getTvsByCategory);

export default tvroutes