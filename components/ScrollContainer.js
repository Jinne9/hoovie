import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import PropTypes from 'prop-types';

const ScrollContainer = ({ loading, children, contentContainerStyle, refreshFn }) => {
    // 새로고침
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        ///// 각 스크린 함수 호출
        await refreshFn();
        setRefreshing(false);
    };
    return (
        <ScrollView
            // 땡겨서 새로고침
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    tintColor={"white"}
                />
            }
            style=
            {{
                backgroundColor: "black"
            }}
            // 로딩 써클
            contentContainerStyle=
            {{
                flex: loading ? 1 : 0,
                justifyContent: loading ? "center" : "flex-start",
                ...contentContainerStyle
            }}
        >
            {
                loading ? (<ActivityIndicator color="white" size="large" />) : children
            }
        </ScrollView>
    )
};

ScrollContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    contentContainerStyle: PropTypes.object,
    refreshFn: PropTypes.func
}

export default ScrollContainer;