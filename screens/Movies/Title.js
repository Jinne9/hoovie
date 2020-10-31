import React from "react";
import styled from "styled-components/native";
import Proptypes from 'prop-types';

const Text = styled.Text`
    color : white;
    font-weight:bold;
    font-size:16px;
    margin-left : 30px;
`;

const Title = ({title}) => <Text>{title}</Text>;

Title.proptypes = {
    title:Proptypes.string.isRequired
};

export default Title;