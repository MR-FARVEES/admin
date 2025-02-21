import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  Appearance,
  BackHandler,
} from "react-native";
import axios from "axios";
import { AuthStackParamList } from "../../data/navigation";
import { Configuration } from "../../interfaces/config";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

export function Login({ navigation, config, ip, company }: any) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => null,
    });
    // Disable hardware back button on Android
    const backAction = () => {
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Prevent going back using `beforeRemove` event
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault(); // Prevent the screen from being removed
    });

    return () => {
      backHandler.remove(); // Cleanup the back handler
      unsubscribe(); // Cleanup the event listener
    };
  }, []);

  const handleLogin = async () => {
    try {
      // const res = await axios
      //   .post(
      //     `http://${ip}:3000/company/auth`,
      //     { username, password },
      //     {
      //       headers: { "Content-Type": "application/json" },
      //     }
      //   )
      //   .then((response) => {
      //     if (response.data.msg === "exists") {
      //       goToPrimaryUI(response.data.company);
      //     } else if (response.data.msg == "not-found") {
      //       setFailure(true);
      //     } else {
      //       setRequired(true);
      //     }
      //   });
      navigation.navigate("PrimaryUI", { config, ip, company });
    } catch (error) {}
  };

  const handleRegister = () => {
    navigation.navigate("RegisterAccount", { config, ip });
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
        <View style={[styles.loginContainer]}>
          {/* <Text style={[styles.heading, { color: config.textPrimaryColor }]}>
            Login Accounts
          </Text> */}
          <TextInput
            style={[
              styles.input,
              {
                color: config.textPrimaryColor,
                backgroundColor: config.backgroundColor,
              },
            ]}
            placeholder={"Username"}
            placeholderTextColor={config.textSecondar}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                color: config.textPrimaryColor,
                backgroundColor: config.backgroundColor,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={"gray"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <View style={styles.buttonGroup}>
            <View
              style={{
                marginBottom: isTablet ? 0 : 10,
                width: isTablet ? "50%" : "100%",
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.3)",
                  false
                )}
                onPress={handleLogin}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    { backgroundColor: config.buttonPrimaryColor },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.backgroundColor,
                      padding: 15,
                    }}
                  >
                    Login
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View
              style={{
                marginBottom: isTablet ? 0 : 10,
                width: isTablet ? "50%" : "100%",
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.3)",
                  false
                )}
                onPress={handleRegister}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    { backgroundColor: config.surfaceColor },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.textPrimaryColor,
                      padding: 15,
                    }}
                  >
                    Register
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: isTablet ? "50%" : "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  loginContainer: {
    width: "100%",
    flexGrow: 1,
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: 700,
    marginBottom: 25,
  },
  input: {
    marginBottom: 10,
    borderWidth: 2,
    padding: 15,
    paddingLeft: 15,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    paddingBottom: isTablet ? 0 : 25,
    width: "100%",
    gap: isTablet ? "2.5%" : 0,
  },
  buttonStyle: {
    borderRadius: 10,
    flexShrink: 1,
    width: "auto",
    maxWidth: isTablet ? "95%" : "100%",
  },
});
