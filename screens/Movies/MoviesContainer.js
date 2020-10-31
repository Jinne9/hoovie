import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import MoviesPrenster from "./MoviesPresenter";

export default () => {
  // 1번만 Rendering 하기 위해 모든 State를 한 곳에 모은다.
  const[movies, setMovies] = useState({
    loading : true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
  });

  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    // 한 번만 Rendering 한다
    // console.log(`여기여기 ${popular}`);
    
    setMovies({
      loading : false,
      nowPlaying,
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // 모든 State 를 보낸다 {...State}
  return <MoviesPrenster {...movies} />;
};
