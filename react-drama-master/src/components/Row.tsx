import { useState, useEffect } from 'react';
import {base_url} from '../utils/request'
import axios from '../utils/axios'
import "../assets/Row.scss";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
    title : string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
    id: string;
    name:string;
    title:string;
    original_title:string;
    original_name:string;
    poster_path:string;
    backdrop_path:string;
    release_date:string;
    origin_country:string;
};

export const Row = ({title,fetchUrl,isLargeRow}:Props) => {
    const [movies,setMovies] = useState<Movie[]>([]);
    const [videoId,setVideoId] = useState('');
    const YOUTUBE_SEARCH_API_URI = 'https://www.googleapis.com/youtube/v3/search?';

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const handleClick = async (movie:Movie) => {
        if (videoId) {
            setVideoId("");
        } else{        
        let queryWord;
        if(movie.original_title){
            queryWord = movie.original_title
        } else  if (movie.original_name) {
            queryWord = movie.original_name;
        }

        let releaseDate = '1970-01-01T00:00:00Z';
        if (movie.release_date) {
            const dateElements: any = movie.release_date.split('-');
            releaseDate = `${dateElements[0] - 1}-${dateElements[1]}-${dateElements[2]}T00:00:00Z`;
        }
        
        const params: any = {
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            q: queryWord,
            type: 'video',
            maxResults: '1',
            order: 'viewCount',
            publishedAfter: releaseDate,
            regionCode: movie.origin_country ? movie.origin_country : 'JP',
            videoEmbeddable: true,
        };

        const queryParams = new URLSearchParams(params);

        fetch(YOUTUBE_SEARCH_API_URI + queryParams)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.items && result.items.length !== 0) {
                        const firstItem = result.items[0];
                        setVideoId(firstItem.id.videoId);
                    }
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    return(
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
                <Slider {...settings}>
                    {movies.filter(movie => movie.poster_path && movie.backdrop_path).map((movie) => (
                        <img
                        key={movie.id}
                        className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.original_name}
                        onClick={() => handleClick(movie)}
                    />
                    ))}
                </Slider>
            </div>
            <div className="Row-youtube">
                {videoId &&
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allowFullScreen
                    />
                }
            </div>
        </div>
    );
}; 


