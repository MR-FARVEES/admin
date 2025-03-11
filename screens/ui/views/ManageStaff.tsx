import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AllStaff from "./Staff/AllStaff";
import NewStaff from "./Staff/NewStaff";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

export default function ManageStaffView({ config, ip }: any) {
  const [currentTab, setCurrentTab] = useState("All");

  const handleTabSelection = (currentTab: string) => {
    setCurrentTab(currentTab);
  };

  const renderSelectedTab = () => {
    switch (currentTab) {
      case "All":
        return <AllStaff config={config} ip={ip} />;
      case "New":
        return <NewStaff config={config} ip={ip} />;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: config.backgroundColor }]}
    >
      <Text style={styles.header}>Staff Details</Text>
      <View style={[styles.tabBar, { backgroundColor: config.surfaceColor, borderRadius: 35 }]}>
        <View
          style={[
            styles.tabBarButton,
            currentTab === "All" && {
              backgroundColor: config.backgroundColor,
              borderRadius: 25,
            },
          ]}
        >
          <TouchableOpacity onPress={() => handleTabSelection("All")}>
            <Text style={styles.tabBarButtonText}>All Staffs</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabBarButton,
            currentTab === "New" && {
              backgroundColor: config.backgroundColor,
              borderRadius: 25,
            },
          ]}
        >
          <TouchableOpacity onPress={() => handleTabSelection("New")}>
            <Text style={styles.tabBarButtonText}>New Staff</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderSelectedTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  header: {
    marginTop: 40,
    fontSize: isTablet ? 28 : 24,
    fontWeight: 600,
    marginBottom: isTablet ? 30 : 10,
  },
  tabBar: {
    width: isTablet ? "50%" : "100%",
    padding: 8,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBarButton: {
    width: "48%",
    padding: 8,
  },
  tabBarButtonText: {
    textAlign: "center",
    fontSize: isTablet ? 20 : 14,
    fontWeight: 600,
  },
});
