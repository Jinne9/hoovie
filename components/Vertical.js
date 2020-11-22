import React from "react";
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Poster from "./Poster";
import Votes from "./Votes";
import { TouchableOpacity } from "react-native";
import { trimText } from "../utils";
import { useNavigation } from "@react-navigation/native";


const Container = styled.View`
    align-items: center;
    margin-right:20px;
`;

const Title = styled.Text`
    color:white;
    font-weight: 500;
    margin:10px 0px 5px 0px;
`;

const Vertical = ({ isTv = false, id, poster, title, votes }) => {
    // Naivigator 를 통해 정보를 전달
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Detail", {
            isTv,
            id,
            title,
            poster,
            votes
        });
    };
    return (
        <TouchableOpacity onPress={goToDetail}>
            <Container>
                <Poster url={poster} />
                <Title>{trimText(title, 11)}</Title>
                {votes > 0 && <Votes votes={votes} />}
            </Container>
        </TouchableOpacity>
    )
};

Vertical.propTypes = {
    id: PropTypes.number.isRequired,
    poster: PropTypes.string,
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
};

export default Vertical;