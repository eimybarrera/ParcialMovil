import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Stack from "./src/screens/Stack";

const TabNav = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Stack" component={Stack} />
    </HomeStack.Navigator>
  );
}

function RoutingTabs() {
  return (
    <TabNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "red",
      }}
    >
      <TabNav.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "holiooo",
          tabBarIcon: (color, size) => (
            <AntDesign name="heart" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <TabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (color, size) => (
            <AntDesign name="hearto" size={24} color="black" />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RoutingTabs />
    </NavigationContainer>
  );
}
