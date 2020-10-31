import axios from "axios";

const TMDB_KEY = "4ebd878e56adb27a8c3e505be4b53223";

// API 키와 parameters로 해당 정보 가져오기
const makeRequest = (path, params) => 
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    }
  });

  // 원하는 함수 실행해 정보 가져오기 & error 처리
  const getAnything = async(path, params = {}) =>{
    try{
        const{
            data:{results}
        } = await makeRequest(path, params);
        // movies : [], error : null
        return [results, null];
    }catch(e){
        // movies : null, error : e
        return [null, e];
    }
  };

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: (query) => getAnything("/search/movie", { query }),
  movie: (id) => getAnything(`/movie/${id}`),
  discover: () => getAnything("/discover/movie")
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: (query) => getAnything("/search/tv", { query }),
  show: (id) => getAnything(`/tv/${id}`)
};

export const apiImage = (path) => `https://image.tmdb.org/t/p/w500/${path}`;
