import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AllProducts from "./Inventory/AllProducts";
import NewProduct from "./Inventory/NewProduct";

const { width } = Dimensions.get("window");
const isTablet = width >= 600;

export default function ManageProductView({ config, ip }: any) {
    const [currentTab, setCurrentTab] = useState("All");
    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
    }
    const renderSelectedTab = () => {
        switch (currentTab) {
            case "All":
                return <AllProducts config={config} ip={ip} />
            case "New":
                return <NewProduct config={config} ip={ip} />
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
            <Text style={styles.heading}>Product Details</Text>
            <View style={[styles.tabBar, { backgroundColor: config.surfaceColor, borderRadius: 25, }]}>
                <View style={[styles.tabButton, currentTab === "All" && { backgroundColor: config.backgroundColor, borderRadius: 25, }]}>
                    <TouchableOpacity onPress={() => handleTabChange("All")}>
                        <Text style={styles.tabBarButtonText}>All Products</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.tabButton, currentTab === "New" && { backgroundColor: config.backgroundColor, borderRadius: 25, }]}>
                    <TouchableOpacity onPress={() => handleTabChange("New")}>
                        <Text style={styles.tabBarButtonText}>New Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {renderSelectedTab()}   
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        padding: 15,
    },
    heading: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 10,
    },
    tabBar: {
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    tabButton: {
        width: "48%",
        padding: 8,
    },
    tabBarButtonText: {
        textAlign: "center",
        fontSize: 14,
    }
});