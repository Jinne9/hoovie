import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { apiImage } from '../../api';
import Poster from '../Poster';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Votes from '../Votes';
import { trimText } from '../../utils';
import { useNavigation } from '@react-navigation/native';

// 영화 슬라이드 컴포넌트

// 영화 이미지
const BG = styled.Image`
    height:100%;
    width:100%;
    opacity : 0.4;
    position : absolute;
`;
// 영화를 담는 콘테이너
const Container = styled.View`
    height:100%;
    width:100%;
`;
// 각 영화 콘텐츠
const Content = styled.View`
    height : 100%;
    flex-direction : row;
    justify-content:space-around;
    align-items: center;
`;
// 영화 관련 데이터 
const Data = styled.View`
    width: 50%;
    align-items:flex-start;
`;
// 영화 제목
const Title = styled.Text`
    color : white;
    font-weight: bold;
    font-size: 18px;
    margin-bottom:10px;
`;
// 영화 투표
const VotesContainer = styled.Text`
    margin-bottom:7px;
`;
// 영화 요약 설명
const Overview = styled.Text`
    color: rgb(220,220,220);
    font-size:14px;
    font-weight:500;
`;
// 버튼
const Button = styled.View`
    margin-top:10px;
    background-color:#e74c3c;
    padding: 7px 10px;
    border-radius:3px;
`;
// 버튼
const ButtonText = styled.Text`
    color:white;
`;

const Slide = ({ id, title, backgroundImage, votes, overview, poster }) => {
    // Navigator 로 보낸다
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Detail", {
            id, title, backgroundImage, votes, overview, poster
        });
    };

    return (
        <Container>
            <BG source={{ uri: apiImage(backgroundImage) }} />
            <Content>
                <Poster url={poster} />
                <Data>
                    <Title>{trimText(title, 20)}</Title>
                    <VotesContainer>
                        {votes ? <Votes votes={votes} /> : null}
                    </VotesContainer>
                    <Overview>{trimText(overview, 110)}</Overview>
                    <TouchableOpacity onPress={goToDetail}>
                        <Button>
                            <ButtonText>View details</ButtonText>
                        </Button>
                    </TouchableOpacity>
                </Data>
            </Content>
        </Container>
    );
};

// Type 검사 및 지정
Slide.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

export default Slide;