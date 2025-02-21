import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AllStaff from "./Staff/AllStaff";
import NewStaff from "./Staff/NewStaff";

export default function ManageStaff({ config, ip }: any) {
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
      <View style={[styles.tabBar, { backgroundColor: config.surfaceColor }]}>
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
  },
  header: {
    marginLeft: 5,
    fontSize: 24,
    fontWeight: 600,
  },
  tabBar: {
    marginTop: 10,
    padding: 8,
    borderRadius: 30,
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
    fontSize: 15,
    fontWeight: 600,
  },
});
