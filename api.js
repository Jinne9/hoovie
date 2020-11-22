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
const getAnything = async (path, params = {}) => {
  try {
    const {
      // 다운로드 받은 데이터가 가지고 있는 "results" object api 
      data: { results },
      // data가 "results"를 가지고 있지 않은 경우를 대비해 모든 data를 가져온다.
      data
    } = await makeRequest(path, params);
    // movies : [], error : null
    return [results || data, null];
  } catch (e) {
    // movies : null, error : e
    console.log(e);
    return [null, e];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: (query) => getAnything("/search/movie", { query }),
  movie: (id) => getAnything(`/movie/${id}`, { append_to_response: "videos" }),
  discover: () => getAnything("/discover/movie")
};


export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: (query) => getAnything("/search/tv", { query }),
  show: (id) => getAnything(`/tv/${id}`, { append_to_response: "videos" })
};

export const apiImage = (
  path,
  defaultPoster = "https://www.joblo.com/assets/images/oldsite/posters/images/full/uknown-2010-poster.jpg"
) => path ? `https://image.tmdb.org/t/p/w500/${path}` : defaultPoster;
