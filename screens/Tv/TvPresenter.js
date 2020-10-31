import React from 'react';
import HorizontalSlider from '../../components/HorizontalSlider';
import ScrollContainer from '../../components/ScrollContainer';
import Horizontal from '../../components/Horizontal';
import Vertical from '../../components/Vertical';
import styled from 'styled-components/native';
import List from '../../components/List';
import Slide from '../../components/Movies/Slide';
import Swiper from 'react-native-web-swiper';
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
    margin-top:30px;
`;
const SliderContainer = styled.View`
  width : 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom:50px;
`;

export default ({ loading, popular, topRated, today }) => (
    <ScrollContainer loading={loading}>
        <Container>
            <HorizontalSlider title="Popular Shows">
                {popular.map(show =>
                    <Vertical
                        id={show.id}
                        key={show.id}
                        poster={show.poster_path}
                        title={show.name}
                        votes={show.vote_average}
                    />)}
            </HorizontalSlider>
            <HorizontalSlider title="Top Rated">
                {topRated.map(show =>
                    <Vertical
                        id={show.id}
                        key={show.id}
                        poster={show.poster_path}
                        title={show.name}
                        votes={show.vote_average}
                    />)}
            </HorizontalSlider>

            <List title="Airing Today">
                {today.map((show, index) =>
                    index % 3 == 0 ?
                        <SliderContainer>
                            {/* constrolsEnabled 컨트롤 버튼 없애기, loop timeout 자동슬라이드 기능 */}
                            < Swiper controlsEnabled={false} loop timeout={3} >
                                {/* movie가 가지고 있는 id통해서 현재 상영 중인 영화목록 만들어 보여주기 */}
                                {
                                    topRated.map(shows => (
                                        <Slide
                                            key={shows.id}
                                            id={shows.id}
                                            title={shows.name}
                                            poster={shows.poster_path }
                                            overview={shows.overview}
                                        />
                                    ))
                                }
                            </Swiper >
                        </SliderContainer >
                        :
                        <Horizontal
                            key={show.id}
                            id={show.id}
                            title={show.name}
                            poster={show.poster_path}
                            overview={show.overview}
                        />)}
            </List>
        </Container>
    </ScrollContainer>
);