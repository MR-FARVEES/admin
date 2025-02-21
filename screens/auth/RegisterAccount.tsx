import { NavigationProp } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  Keyboard,
  BackHandler,
} from "react-native";
import axios from "axios";
import { CompanyProps } from "../../interfaces/company";
import { UserProps } from "../../interfaces/user";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

export function RegisterAccount({ navigation, config, ip }: any) {
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [formUserData, setFormUserData] = useState<UserProps>({
    fname: "",
    lname: "",
    username: "",
    password: "",
    nic: "",
    contact: "",
    address: "",
    dob: "",
  });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Login", { config, ip });
  };

  const handleUserInputChange = (name: keyof UserProps, value: string) => {
    setFormUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserRegister = async () => {
    try {
      // const res = await axios
      //   .post(`http://${ip}:3000/user/register`, formUserData, {
      //     headers: { "Content-Type": "application/json" },
      //   })
      //   .then((response: any) => {
      //     if (response.data.msg === "exists") {
      //       setModalErrorVisible(true);
      //     } else if (response.data.msg === "created") {
      //       navigation.navigate("Login", { config, ip });
      //     }
      //   });
      navigation.navigate("RegisterCompany", { config, ip });
    } catch (error) {}
  };

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
        <ScrollView
          style={[styles.registerContainer]}
          keyboardShouldPersistTaps="handled"
        >
          {/* <Text style={[styles.heading, { color: config.textPrimaryColor }]}>
            Register New Account
          </Text> */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="First Name"
            value={formUserData.fname}
            onChangeText={(text) => handleUserInputChange("fname", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Last Name"
            value={formUserData.lname}
            onChangeText={(text) => handleUserInputChange("lname", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Userame"
            value={formUserData.username}
            onChangeText={(text) => handleUserInputChange("username", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Password"
            value={formUserData.password}
            onChangeText={(text) => handleUserInputChange("password", text)}
            secureTextEntry
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Date of Birth"
            value={formUserData.dob}
            onChangeText={(text) => handleUserInputChange("dob", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="NIC"
            value={formUserData.nic}
            onChangeText={(text) => handleUserInputChange("nic", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Mobile"
            value={formUserData.contact}
            onChangeText={(text) => handleUserInputChange("contact", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Address"
            value={formUserData.address}
            onChangeText={(text) => handleUserInputChange("address", text)}
          />

          <View
            style={[
              styles.buttonGroup,
              { paddingBottom: isKeyboardVisible ? 40 : 0 },
            ]}
          >
            <View
              style={[
                styles.button,
                { backgroundColor: config.buttonPrimaryColor },
              ]}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.3)",
                  false
                )}
                onPress={handleUserRegister}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.backgroundColor,
                      padding: 15,
                    }}
                  >
                    Next
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: config.surfaceColor,
                },
              ]}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.3)",
                  false
                )}
                onPress={handleLogin}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.textPrimaryColor,
                      padding: 15,
                    }}
                  >
                    Back to Login
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: isTablet ? "70%" : "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  registerContainer: {
    flexGrow: 1,
    borderRadius: 5,
  },

  heading: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: 700,
    marginBottom: 20,
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
  button: {
    marginTop: isTablet ? 0 : 10,
    borderRadius: 10,
    flexShrink: 1,
    width: isTablet ? "50%" : "100%",
  },
});
