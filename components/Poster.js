import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { apiImage } from "../api";

// Poster 출력 컴포넌트

// 포스터 이미지 크기
const Image = styled.Image`
    width : 100px;
    height : 160px;
    border-radius:4px;
`;

const Poster = ({ url }) => (
    <Image resizeMode="cover" source={{ uri: apiImage(url) }} />
);

Poster.propTypes = {
    url: PropTypes.string
};

export default Poster;