import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import PropTypes from 'prop-types';

const ScrollContainer = ({ loading, children }) => (
    <ScrollView
        style=
        {{
            backgroundColor: "black"
        }}
        contentContainerStyle=
        {{
            flex: loading ? 1 : 0,
            justifyContent: loading ? "center" : "flex-start"
        }}
    >
        {
            loading ? (<ActivityIndicator color="white" size="large" />) : children
        }
    </ScrollView>
);

ScrollContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

export default ScrollContainer;