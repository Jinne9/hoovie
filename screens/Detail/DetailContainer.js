import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";
import * as WebBrowser from "expo-web-browser";

export default ({
    // Navigation 을 통해 Data 값 가져오기
    navigation,
    route: {
        params: { isTv, id, title, backgroundImage, poster, votes, overview }
    }
}) => {
    // loading
    const [loading, setLoading] = useState(true);
    // 받아온 params를 가져와 기본 사용 
    const [detail, setDetail] = useState({
        loading: true,
        result: {
            title,
            backgroundImage,
            poster,
            overview,
            votes,
            videos: {
                results: []
            }
        }
    });

    // data 받아오기
    const getData = async () => {
        // tv 냐 movie 냐
        const [getDetail, getDetailError] = isTv ? await tvApi.show(id) : await movieApi.movie(id);

        setDetail({
            loaidng: false,
            result: {
                ...getDetail,
                title: getDetail.title || getDetail.name,
                backgroundImage: getDetail.backdrop_path,
                poster: getDetail.poster_path,
                overview: getDetail.overview,
                votes: getDetail.vote_average
            }
        });
    };

    // id가 바뀌면 data를 받아온다.
    useEffect(() => {
        getData()
    }, [id]);

    React.useLayoutEffect(() => {
        // Navigation 헤더에 제목 변수 입력
        navigation.setOptions({ title });
    });

    // Web브라우저 열기
    const openBrowser = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }

    return <DetailPresenter openBrowser={openBrowser} {...detail} />;
}
