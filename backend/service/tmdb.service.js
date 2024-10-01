import axios from "axios";
import { ENV_VARS } from "../config/envVARs.js";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export const fetchFromTMDB = async (url) => {
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY
        },
    };

    const responce = await axios.get(url, options)


        if(responce.status !== 200) {
            throw new Error('Failed to fetch data from TMDB' + responce.statusText);
        }
     
        return responce.data;

    
}