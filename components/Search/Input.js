import React from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';

const TextInput = styled.TextInput`
    background-color : white;
    margin : 0px 30px 50px;
    padding: 5px 15px;
    border-radius: 20px;
`;

const Input = ({ placeholder, value, onChange, onSubmit }) => (
    <TextInput
        // keyboardType 키보드 타입
        onChangeText={onChange}     // 텍스트가 변할 때
        onSubmitEditing={onSubmit}  // 검색버튼을 눌렀을 때
        placeholder={placeholder}
        returnKeyType={"search"}
    />
);

Input.proptype = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Input;