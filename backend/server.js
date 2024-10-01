import express from 'express';
import router from './routes/auth.route.js';
import { ENV_VARS } from './config/envVARs.js';
import { connection } from './config/db.js';
import movierouter from './routes/movie.routes.js';
import tvroutes from './routes/tv.route.js';
import { protectRouter } from './middleware/protectRouter.js';
import cookieParser from 'cookie-parser';
import searchRoute from './routes/search.route.js';


const app = express();
app.use(express.json())
app.use(cookieParser())


const port = ENV_VARS.PORT

app.use("/api/v1/auth", router )
app.use("/api/v1/movie",protectRouter,movierouter )
app.use("/api/v1/tv",protectRouter,tvroutes )
app.use("/api/v1/search",protectRouter,searchRoute )

app.listen(port, ()=>{
    console.log('Server is running on port'+ port);
    connection()
}) 