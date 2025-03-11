import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { BackHandler } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardView from "./views/Dashboard";
import ManageStaffView from "./views/ManageStaff";
import ManageProductView from "./views/MangeProduct";
import ManageInventoryView from "./views/ManageInventory";

const Tab = createBottomTabNavigator();

export function PrimaryUI({ navigation, config, ip, company }: any) {
  useEffect(() => {
    navigation.setOptions({
      title: company?.companyName,
      headerShown: false,
      gestureEnabled: false,
      headerLeft: () => null,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Login", { config, ip });
            }}
          >
            <Ionicons
              name={"power"}
              size={25}
              color={config.textPrimaryColor}
            />
          </Pressable>
        </View>
      ),
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

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 70 },
        tabBarItemStyle: { paddingHorizontal: 0 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-circle";
          if (route.name == "Dashboard") {
            iconName = "rocket";
          } else if (route.name == "Staffs") {
            iconName = "document-text";
          } else if (route.name == "Products") {
            iconName = "gift";
          } else if (route.name == "Expenses") {
            iconName = "wallet";
          } else if (route.name == "Inventory") {
            iconName = "bar-chart";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: config.secondaryColor,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" initialParams={config}>
        {(props: any) => <DashboardView {...props} config={config} ip={ip} />}
      </Tab.Screen>
      <Tab.Screen name="Staffs" initialParams={config}>
        {(props: any) => <ManageStaffView {...props} config={config} ip={ip} />}
      </Tab.Screen>
      <Tab.Screen name="Products" initialParams={config}>
        {(props: any) => <ManageProductView {...props} config={config} ip={ip} />}
      </Tab.Screen>
      <Tab.Screen name="Inventory" initialParams={config}>
        { (porps: any) => <ManageInventoryView {...porps} config={config} ip={ip} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
