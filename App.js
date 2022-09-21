import * as React from "react";
// import { Button, View, Text } from "react-native";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Button,
  Image,
} from "native-base";
import "react-native-gesture-handler";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Audio } from "expo-av";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sirine.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function stopSound() {
    setSound();

    console.log("Stop Sound");
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Center bg={"blueGray.900"} px={4} flex={1}>
      <VStack alignItems="center">
        <Text color="white" fontSize={"xl"} bold>
          Tekan tombol di bawah ketika
        </Text>
        <Text color="white" fontSize={"xl"} bold>
          perlu{" "}
          <Text color="#04eee3" fontSize={"xl"} bold>
            pertolongan
          </Text>
        </Text>
        <Button
          marginTop={5}
          borderRadius="full"
          onPress={() => navigation.navigate("Sos")}
        >
          <Image
            source={require("./assets/1.png")}
            alt="Alternate Text"
            size="2xl"
            // marginTop={7}
          />
        </Button>
        <HStack space={2} alignItems="center">
          <Button
            color="emerald.50"
            marginTop={6}
            size={"lg"}
            onPress={() => navigation.navigate("Semilir Map")}
          >
            <Text color={"white"} bold>
              Denah Dusun Semilir
            </Text>
          </Button>
        </HStack>
        <Button
          color="emerald.50"
          marginTop={6}
          size={"lg"}
          onPress={stopSound}
        >
          <Text color={"white"} bold>
            Stop Sirine
          </Text>
        </Button>
      </VStack>
    </Center>
  );
}

function Sos() {
  return (
    <Center>
      <View
        style={{ borderWidth: 1, height: "100%", width: "100%" }}
      >
        <Image
          source={require("./assets/sos.gif")}
          alt="sos"
          width="100%"
          height="100%"
          resizeMode="contain"
          style={{
            transform: [{ rotate: "90deg" }],
          }}

          // marginTop={7}
        />
      </View>
    </Center>
  );
}

function DetailsScreen() {
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text>Details Screen</Text>
    //   <Button
    //     title="Go to Details... again"
    //     onPress={() => navigation.push("Details")}
    //   />
    //   <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    //   <Button title="Go back" onPress={() => navigation.goBack()} />
    //   <Button
    //     title="Go back to first screen in stack"
    //     onPress={() => navigation.popToTop()}
    //   />
    // </View>
    <Center>
      <View
        style={{ borderWidth: 1, flexShrink: 1, height: "100%", width: "100%" }}
      >
        <ReactNativeZoomableView
          // initialZoom={1}
          maxZoom={30}
          // contentWidth="100%"
          // contentHeight="100%"
        >
          <Image
            // style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            // source={{ uri: "https://via.placeholder.com/400x200.png" }}
            source={require("./assets/denah.png")}
            alt="Denah"
            width="100%"
            height="100%"
            resizeMode="contain"
            // size="2xl"
          />
        </ReactNativeZoomableView>
      </View>
    </Center>
  );
}

const Stack = createDrawerNavigator();

function MyDrawer() {
  return (
    <Stack.Navigator useLegacyImplementation>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Semilir Map" component={DetailsScreen} />
      <Stack.Screen name="Sos" component={Sos} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
