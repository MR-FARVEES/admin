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

export function RegisterCompany({ navigation, config, ip }: any) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [formCompanyData, setFormCompanyData] = useState<CompanyProps>({
    companyName: "",
    contact: "",
    address: "",
    branch: "",
  });

  const handleCompanyInputChange = (
    name: keyof CompanyProps,
    value: string
  ) => {
    setFormCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserRegister = () => {
    navigation.navigate("RegisterAccount", { config, ip });
  };

  const handleCompanyRegister = () => {
    navigation.navigate("Login", { config, ip });
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
            placeholder="Company Name"
            value={formCompanyData.companyName}
            onChangeText={(text) =>
              handleCompanyInputChange("companyName", text)
            }
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Company Contact"
            value={formCompanyData.contact}
            onChangeText={(text) => handleCompanyInputChange("contact", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Company Address"
            value={formCompanyData.address}
            onChangeText={(text) => handleCompanyInputChange("address", text)}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: config.backgroundColor,
                color: config.textPrimaryColor,
              },
            ]}
            placeholder="Company Branch"
            value={formCompanyData.branch}
            onChangeText={(text) => handleCompanyInputChange("branch", text)}
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
                onPress={handleCompanyRegister}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.backgroundColor,
                      padding: 15,
                    }}
                  >
                    Finish
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
                onPress={handleUserRegister}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: config.textPrimaryColor,
                      padding: 15,
                    }}
                  >
                    Back to Register Account
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
