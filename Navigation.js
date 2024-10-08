import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Home from "./src/screens/Home";
import Stack from "./src/screens/Stack";
import Gato from "./src/screens/Gato";
import InfoGatos from "./src/screens/InfoGatos";


const TabNav = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const GatoStack= createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Perritos">
      <HomeStack.Screen name="Perritos" component={Home} />
      <HomeStack.Screen name="Stack" component={Stack} />
    </HomeStack.Navigator>
  );
}
function GatoStackScreen(){
  return(
    <GatoStack.Navigator initialRouteName="Gaticos">
      <GatoStack.Screen name="Gaticos" component={Gato}/>
      <GatoStack.Screen name="InfoGatos" component={InfoGatos}/>
    </GatoStack.Navigator>
  )
}

function RoutingTabs() {
  return (
    <TabNav.Navigator
      initialRouteName="Perritos"
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "red",
      }}
    >
      <TabNav.Screen
        name="Perritos"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Perritos",
          tabBarIcon: (color, size) => (
            <FontAwesome5 name="dog" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <TabNav.Screen
        name="Gaticos"
        component={GatoStackScreen}
        options={{
          tabBarLabel: "Gaticos",
          tabBarIcon: (color, size) => (
            <FontAwesome5 name="cat" size={24} color="black" />
          ),
          headerShown: false,
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
