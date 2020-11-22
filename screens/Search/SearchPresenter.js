import React from "react";
import styled from "styled-components/native";
import HorizontalSlider from "../../components/HorizontalSlider";
import ScrollContainer from "../../components/ScrollContainer";
import Input from "../../components/Search/Input";
import Vertical from "../../components/Vertical";

const Container = styled.ScrollView`
    background-color : black;
`;

const Text = styled.Text`
    color : white;
`;

export default ({ isTv, movies, shows, keyword, onChange, onSubmit, refreshFn }) => (
    <ScrollContainer loading={false} refreshFn={onSubmit} contentContainerStyle={{ paddingTop: 10 }} >
        <Input
            placeholder={"write a keyword"}
            value={keyword}
            onChange={onChange}
            onSubmit={onSubmit}
        />
        {/* if true/false && react Component (>> element는 항상 true) */}
        {movies.length !== 0 && (
            <HorizontalSlider title={"Movie Results"}>
                {movies.map(movie => (
                    <Vertical
                        key={movie.id}
                        id={movie.id}
                        votes={movie.vote_average}
                        title={movie.title}
                        poster={movie.poster_path}
                    />
                ))}
            </HorizontalSlider>
        )}
        {shows.length !== 0 && (
            <HorizontalSlider title={"Tv Results"}>
                {shows.map(show => (
                    <Vertical
                        isTv={true}
                        key={show.id}
                        id={show.id}
                        votes={show.vote_average}
                        title={show.name}
                        poster={show.poster_path}
                    />
                ))}
            </HorizontalSlider>
        )}
    </ScrollContainer>
);