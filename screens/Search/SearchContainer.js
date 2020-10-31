import React, { useState } from "react";
import { movieApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default () => {

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState({
        movies: [],
        shows: [],
        movieError: null,
        showerror: null
    });

    // Input Text 가 변환될 때 실행
    const onChange = (text) => setKeyword(text);
    // Input Text 제출 시 실행
    const search = async () => {
        // 검색 시간이 필요하기 때문에 setResults로 넘어가기 전에, 결과가 나올 때까지 대기
        const [movies, movieError] = await movieApi.search(keyword);
        const [shows, showerror] = await tvApi.search(keyword);
        setResults({
            movies,
            shows,
            movieError,
            showerror,
        });
    };

    return (
        <SearchPresenter
            {...results}
            onChange={onChange}
            onSubmit={search}
            keyword={keyword}
        />
    );
};