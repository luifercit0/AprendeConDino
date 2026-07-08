import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import MenuScreen from "../screens/MenuScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          height: 75,
          paddingBottom: 10,
          paddingTop: 5,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#FF5722",
        tabBarInactiveTintColor: "#B0BEC5",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
          marginBottom: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Menú") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View style={styles.iconContainer}>
              <View style={[
                styles.iconBackground,
                focused && styles.iconBackgroundActive
              ]}>
                <Ionicons name={iconName} size={26} color={color} />
              </View>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Menú" 
        component={MenuScreen}
        options={{
          tabBarLabel: "Inicio",
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconBackground: {
    padding: 4,
    borderRadius: 12,
  },
  iconBackgroundActive: {
    backgroundColor: "rgba(255, 87, 34, 0.08)",
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    width: 20,
    height: 3,
    backgroundColor: "#FF5722",
    borderRadius: 2,
  },
});