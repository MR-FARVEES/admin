import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import AllInventory from "./Inventory/AllInventory";
import NewInventory from "./Inventory/NewInventory";

const { width } = Dimensions.get("screen");
const isTablet = width > 600

export default function ManageInventoryView({ config, ip }: any) {
    const [currentTab, setCurrentTab] = useState("All");

    const selectCurrentTab = (current: string) => {
        setCurrentTab(current);
    }

    const renderCurrentTab = () => {
        switch (currentTab) {
            case "All":
                return <AllInventory config={config} ip={ip} />;
            case "New":
                return <NewInventory config={config} ip={ip} />;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
            <Text style={styles.header}>Inventory Details</Text>
            <View style={[styles.tabBar, { backgroundColor: config.surfaceColor, borderRadius: 35 }]}>
                <View style={[styles.tabBarButton, currentTab === "All" && {backgroundColor: config.backgroundColor, borderRadius: 25}]}>
                    <TouchableOpacity onPress={() => selectCurrentTab("All")}>
                        <Text style={styles.tabBarButtonText}>All</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.tabBarButton, currentTab === "New" && {backgroundColor: config.backgroundColor, borderRadius: 25}]}>
                    <TouchableOpacity onPress={() => selectCurrentTab("New")}>
                        <Text style={styles.tabBarButtonText}>New</Text>
                    </TouchableOpacity>
                </View>
            </View>
            { renderCurrentTab() }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 15,
        alignItems: "center"
    },
    header: {
        fontSize: isTablet ? 28 : 24,
        fontWeight: 600,
        marginTop: 40,
        marginBottom: isTablet ? 30 : 10,
    },
    tabBar: {
        padding: 8,
        width: isTablet ? "50%" : "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    tabBarButton: {
        width: "48%",
        padding: 8,
    },
    tabBarButtonText: {
        textAlign: "center",
        fontSize: isTablet ? 20 : 14,
        fontWeight: 600,
    }
})