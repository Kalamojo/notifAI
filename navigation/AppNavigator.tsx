import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};