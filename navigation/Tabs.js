import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MoviesContainer from "../screens/Movies/MoviesContainer";
import TvContainer from "../screens/Tv/TvContainer";
import Search from "../screens/Search";
import Discovery from "../screens/Discovery";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

// Navigator Bar Header Name 가져오기
const getHeaderName = (route) =>
  // ||Movies => route,state(optional Changing)가 undefined일 경우 대비해 첫 Navigator를 Movies로
  route?.state?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => {
  // useEffect(() => {
  // useLayoutEffect 는 레이아웃이 모두 렌더링 된 뒤에 Update 된다.
  useLayoutEffect(() => {
    const headerName = getHeaderName(route);
    // props 의 부모에 간섭해 NavigatorBar의 Header를 변경한다.
    navigation.setOptions({
      title: headerName,
    });
  }, [route]);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
          //하단 tap 바 아이콘 지정
        tabBarIcon: ({ focused }) => {
            // 플랫폼 별로 다르게 지정, ios / 그외
            let iconName = Platform.OS ==="ios" ? "ios-" : "md-";
            if(route.name === "Movies"){
                iconName += "film";
            } else if(route.name === "TV"){
                iconName += "tv";
            } else if(route.name === "Search"){
                iconName += "search";
            } else if(route.name === "Discovery"){
                iconName += "heart";
            }
          // 아이콘 지정 : 포커스 되면 흰색, 아니면 녹색
          return (
            <Ionicons
              name= {iconName}
              color={focused ? "white" : "grey"}
              size={26}
            />
          );
        },
      })}
      // 하단 Tab bar 스타일
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Movies" component={MoviesContainer} />
      <Tabs.Screen name="TV" component={TvContainer} />
      <Tabs.Screen name="Discovery" component={Discovery} />
    </Tabs.Navigator>
  );
};
