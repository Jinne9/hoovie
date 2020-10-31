import React from "react";
import styled from "styled-components/native";
import Horizontal from "../../components/Horizontal";
import HorizontalSlider from "../../components/HorizontalSlider";
import Input from "../../components/Search/Input";

const Container = styled.ScrollView`
    background-color : black;
`;

const Text = styled.Text`
    color : white;
`;

export default ({ movies, shows, keyword, onChange, onSubmit }) => (
    <Container>
        <Input
            placeholder={"write a keyyyword"}
            value={keyword}
            onChange={onChange}
            onSubmit={onSubmit}
        />
        <HorizontalSlider title={"Movie Results"}>
            <Horizontal>
                {movies.map(movie => (
                    <Horizontal />
                ))}
            </Horizontal>
        </HorizontalSlider>
        <HorizontalSlider title={"TV Results"}>
            <Horizontal>
                {shows.map(show => (
                    <Horizontal />
                ))}
            </Horizontal>
        </HorizontalSlider>
    </Container>
);