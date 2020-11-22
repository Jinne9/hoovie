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

export default ({ refreshFn, loading, popular, topRated, today }) => (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
        <Container>
            <HorizontalSlider title="Popular Shows">
                {popular.map(show =>
                    <Vertical
                        isTv={true}
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
                        isTv={true}
                        id={show.id}
                        key={show.id}
                        poster={show.poster_path}
                        title={show.name}
                        votes={show.vote_average}
                    />)}
            </HorizontalSlider>

            <List title="Airing Today">
                {today.map((show, index) =>
                    <Horizontal
                        isTv={true}
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