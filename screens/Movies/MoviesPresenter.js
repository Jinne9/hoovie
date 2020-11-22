import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import Slide from "../../components/Movies/Slide";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";

// 스크린 화면의 넓이/높이 가져오기
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  color:white;
`;

const SliderContainer = styled.View`
  width : 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom:50px;
`;

export default ({ refreshFn, loading, nowPlaying, popular, upcoming }) => (
  <ScrollContainer refreshFn={refreshFn} loading={loading}>
    <>
      {/* 슬라이더 영화 부분 */}
      <SliderContainer>
        {/* constrolsEnabled 컨트롤 버튼 없애기, loop timeout 자동슬라이드 기능 */}
        < Swiper controlsEnabled={false} loop timeout={3} >
          {/* movie가 가지고 있는 id통해서 현재 상영 중인 영화목록 만들어 보여주기 */}
          {
            nowPlaying.map(movie => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                overview={movie.overview}
                votes={movie.vote_average}
                backgroundImage={movie.backdrop_path}
                poster={movie.poster_path}
              />
            ))
          }
        </Swiper >
      </SliderContainer >

      {/* 다른 부분 */}
      <Container>
        <HorizontalSlider title={"Popular Movies"}>
          {
            popular.map(movie => (
              <Vertical
                id={movie.id}
                key={movie.id}
                title={movie.original_title}
                votes={movie.vote_average}
                poster={movie.poster_path}
              />
            ))
          }
        </HorizontalSlider>

        <List title={"Coming Soon"}>
          {upcoming.map(movie => (
            <Horizontal
              id={movie.id}
              key={movie.id}
              title={movie.original_title}
              releaseDate={movie.release_date}
              poster={movie.poster_path}
              overview={movie.overview}
            />
          ))}
        </List>
      </Container>
    </>
  </ScrollContainer>
);
