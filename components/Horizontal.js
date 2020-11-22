import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Poster from './Poster';
import { trimText, formatDate } from '../utils';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    padding : 0px 30px;
    padding-right : 100px;
    margin-bottom : 30px;
    flex-direction: row;
`;

const Data = styled.View`
    margin-left : 20px;
    align-items : flex-start;
    width: 80%;
`;

const Title = styled.Text`
    color:white;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
    margin-vertical: 10px;
    color:white;
    font-size: 12px;
`;

const Overview = styled.Text`
    margin-top: 10px;
    color:white;
`;

const Horizontal = ({ isTv = false, id, title, votes, poster, releaseDate, overview }) => {
    // Naivigator 를 통해 정보를 전달
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Detail", {
            isTv,
            id,
            title,
            poster,
            overview,
            releaseDate
        });
    };
    return (
        <TouchableOpacity onPress={goToDetail}>
            <Container>
                <Poster url={poster} />
                <Data>
                    <Title>{trimText(title, 30)}</Title>
                    {/* 출시 날짜 없으면 null */}
                    {releaseDate ? <ReleaseDate>{formatDate(releaseDate)}</ReleaseDate> : null}
                    <Overview>{trimText(overview, 130)}</Overview>
                </Data>
            </Container>
        </TouchableOpacity>
    )
};

Horizontal.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

export default Horizontal;