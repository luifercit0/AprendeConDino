import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Viene por defecto en Expo
import MenuScreen from "../screens/MenuScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Ocultamos el texto para enfocar en lo visual
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          height: 70,
          elevation: 5, // Sombra en Android
          shadowColor: "#000", // Sombra en iOS
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          borderTopWidth: 0, // Quitamos la línea gris aburrida
          paddingBottom: 0, 
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          if (route.name === "Menú") {
            iconName = focused ? "home" : "home-outline";
            iconColor = focused ? "#FF5722" : "#B0BEC5"; // Naranja brillante vs Gris
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
            iconColor = focused ? "#4CAF50" : "#B0BEC5"; // Verde brillante vs Gris
          }

          return <Ionicons name={iconName} size={32} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="Menú" component={MenuScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}