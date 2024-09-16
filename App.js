import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./src/navigation/AppStackNavigation";
import { Provider } from "react-redux";
import store from "./src/app/store";
import { useRef } from "react";
import FlashMessage from "react-native-flash-message";
export default function App() {
  const MessageRef = useRef(null);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackNavigation />
      </NavigationContainer>
      <FlashMessage className="my-24" position="top" ref={MessageRef} />
      <StatusBar style="auto" />
    </Provider>
  );
}
