import { User } from "../models/user.model.js"
import { fetchFromTMDB } from "../service/tmdb.service.js"

export const searchPerson = async(req,res)=>{
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.status.length === 0){
            res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.result[0].id,
                    image : response.result[0].profile_path,
                    title: response.result[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success: true, results: response.results})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const searchMovie = async(req,res)=>{
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.status.length === 0){
            res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.result[0].id,
                    image : response.result[0].poster_path,
                    title: response.result[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success: true, results: response.results})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const searchTv = async(req,res)=>{
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.status.length === 0){
            res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.result[0].id,
                    image : response.result[0].poster_path,
                    title: response.result[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success: true, results: response.results})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const getSearchHistory = async(req,res)=>{
    try {
        res.status(200).json({success: true, content: req.user.searchHistory})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const removeItemFromSearchHistory = async(req,res)=>{
    const {id} = req.params
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
}