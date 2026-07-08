import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import LetrasScreen from "./screens/LetrasScreen";
import NumerosScreen from "./screens/NumerosScreen";
import ColoresScreen from "./screens/ColoresScreen";
import DinoGameScreen from "./screens/DinoGameScreen";
import CertificadoScreen from "./screens/CertificadoScreen";
import FelicidadesScreen from "./screens/FelicidadesScreen";
import BottomTabs from "./navigation/BottomTabs";
import { ScoreProvider } from "./context/ScoreContext";
import { UserProvider } from "./context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ScoreProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="Menu" component={BottomTabs} />

            <Stack.Screen name="Letras" component={LetrasScreen} />

            <Stack.Screen name="Numeros" component={NumerosScreen} />

            <Stack.Screen name="Colores" component={ColoresScreen} />

            <Stack.Screen name="DinoGame" component={DinoGameScreen} />

            <Stack.Screen name="Certificado" component={CertificadoScreen} />

            <Stack.Screen name="Felicidades" component={FelicidadesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScoreProvider>
    </UserProvider>
  );
}
