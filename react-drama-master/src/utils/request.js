export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const requests ={
    reachTrending:`/trending/all/week?api_key=${API_KEY}&language=en-us`,
    reachNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    reactTopRated:`/discover/tv?api_key=${API_KEY}&languager=en-us`,
    reactComedyMovies:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
    reactRomanceMovies:`/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    reactDocumentMovies:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
}

export const base_url = "https://image.tmdb.org/t/p/original";