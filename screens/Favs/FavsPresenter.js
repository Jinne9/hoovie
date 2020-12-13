import React, { useState } from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import styled from "styled-components";
import { apiImage } from "../../api";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
    padding-top : 50px;
    flex : 1;
    background-color: black;
    align-items: center;
`;

const styles = {
    top: 80,
    height: HEIGHT / 1.5,
    width: "90%",
    position: "absolute"
};

const Poster = styled.Image`
    border-radius:25px;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

export default ({ results }) => {

    // 첫 번째 카드 Index
    const [topIndex, setTopIndex] = useState(0);
    // 다음 카드 ::: 인덱스 증가
    const nextCard = () => setTopIndex(currentValue => currentValue + 1);
    // 애니메이트 시킬 위치
    const position = new Animated.ValueXY();
    // 마우스드래그 입력 Event 함수
    const panResponder = PanResponder.create({
        // 1. 작동 시작
        onStartShouldSetPanResponder: () => true,
        // 2. (누적된)Drag 위치에 맞춰 포지션 변화
        onPanResponderMove: (evt, { dx, dy }) => {
            position.setValue({ x: dx, y: dy });
        },
        // 3. 손을 떼면 실행
        onPanResponderRelease: (evt, { dx, dy }) => {

            if (dx >= 200) {
                // 오른쪽
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 100,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(nextCard);
            } else if (dx <= -200) {
                // 왼쪽
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH - 100,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(nextCard);
            } else {
                // 천천히 원래대로 돌아옴 (0,0 포지션으로)
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    // friction:1,
                    bounciness: 10,
                    useNativeDriver: true
                }).start();
            }
        }
    });

    // 두 개의 값을 가지는 interpolate
    const rotationValue = position.x.interpolate({
        // inputRange의 넣은 값이 outputRange값으로 변환되어 반환 *Mathf.Clamp 같은 느낌
        inputRange: [-255, 0, 255],
        outputRange: ["-8deg", "0deg", "8deg"],
        // 한계 값(outoutRange)에 갔을 때 정지
        extrapolate: "clamp"
    });

    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.2, 1]
    });
    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp"
    });

    return (
        <Container>
            {results.map((result, index) => {
                // 1,2 번째 카드 외에는 랜더링 하지 않는다.
                if (index < topIndex) {
                    return null;
                }
                // A. 가장 첫 번째 카드인 경우 
                else if (index === topIndex) {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                // z랜더링 가장 Top
                                zIndex: 1,
                                // 포지션의 위치를 css 문법으로 변환시켜줌
                                transform: [
                                    { rotate: rotationValue },
                                    ...position.getTranslateTransform()
                                ]
                            }}
                            key={result.id}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={{ uri: apiImage(result.poster_path) }} />
                        </Animated.View>
                    );
                }
                // B. 2 번째에 있는 카드
                else if (index === topIndex + 1) {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: secondCardOpacity,
                                transform: [{ scale: secondCardScale }]
                            }}
                            key={result.id}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={{ uri: apiImage(result.poster_path) }} />
                        </Animated.View>
                    );
                }
                // C. 뒤에 있는 카드
                else {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: 0
                            }}
                            key={result.id}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={{ uri: apiImage(result.poster_path) }} />
                        </Animated.View>
                    );
                }
            })}
        </Container>
    );
};
