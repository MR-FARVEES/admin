import { useEffect, useState } from "react";
import { Configuration } from "./interfaces/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/auth/Login";
import { RegisterAccount } from "./screens/auth/RegisterAccount";
import { PrimaryUI } from "./screens/ui/PrimaryUI";
import { RegisterCompany } from "./screens/auth/RegisterCompany";
import { CompanyProps } from "./interfaces/company";
import axios from "axios";

const Stack = createStackNavigator();

export default function App() {
  const ip = "172.20.28.28";
  const config: Configuration = {
    name: "default",
    primaryColor: "#06C167",
    secondaryColor: "#142328",
    backgroundColor: "#FFFFFF",
    surfaceColor: "#E6E6E6",
    tabBarPrimaryColor: "#FFFFFF",
    tabBarSecondaryColor: "#EEEEEE",
    textPrimaryColor: "#000000",
    textSecondaryColor: "#6B6B6B",
    buttonPrimaryColor: "#000000",
    buttonSecondaryColor: "#FFFFFF",
    borderColor: "#000000",
  };

  const company: CompanyProps = {
    companyName: "FTECH",
    contact: "",
    address: "",
    branch: "",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: config.textPrimaryColor,
        }}
      >
        <Stack.Screen name="Login" initialParams={{ config, ip, company }}>
          {(props: any) => (
            <Login {...props} config={config} ip={ip} company={company} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="RegisterAccount"
          initialParams={{ config, ip, company }}
        >
          {(props: any) => (
            <RegisterAccount
              {...props}
              config={config}
              ip={ip}
              company={company}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="RegisterCompany"
          initialParams={{ config, ip, company }}
        >
          {(props: any) => (
            <RegisterCompany
              {...props}
              config={config}
              ip={ip}
              company={company}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="PrimaryUI" initialParams={{ config, ip, company }}>
          {(props: any) => (
            <PrimaryUI {...props} config={config} ip={ip} company={company} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
