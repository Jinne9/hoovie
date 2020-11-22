import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";

const Container = styled.View`
    flex-direction:row;
    align-items: center;
    padding : 7px;
    margin-bottom: 5px;
`;

const Title = styled.Text`
    color : white;
    font-weight : 600;
    margin-right : 10px;
    margin-left : 10px;
`;

const Link = ({ onPress, title, icon }) => (
    <TouchableOpacity onPress={onPress}>
        <Container>
            <FontAwesome name={icon} color="white" size={22} />
            <Title>{title}</Title>
        </Container>
    </TouchableOpacity>
);

export default Link;