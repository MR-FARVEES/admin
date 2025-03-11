import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Price } from "../../../../interfaces/inventory";
import { Inventory } from "../../../../interfaces/inventory";
import { Type } from "../../../../data/constants";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

export default function AllInventory({ config, ip }: any) {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    fetchInventory();
  }, [])

  useEffect(() => {
    if (inventory.length > 0) {
      filterInventoryList("All");
    }
  }, [inventory]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`http:${ip}:3000/inventory/all`);
      setInventory(response.data);
      response.data.map((inv: Inventory) => {
        updateCategories(inv.category);
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const updateCategories = (category: string) => {
    setCategories((prev) => {
      if (!prev.includes(category)) {
        return [...prev, category];
      }
      return prev;
    });
  }

  const filterInventoryList = (category: string) => {
    setCurrentCategory(category);

    if (category === "All") {
      setSelectedInventory(inventory); // Set all products directly
    } else {
      const filteredProducts = inventory.filter(
        (item) => item.category === category
      );
      setSelectedInventory(filteredProducts);
    }
  };

  const renderInventoryItem = ({ item }: { item: Inventory}) => {

    let categoryTheme = ["", "", "black"]; // Default value to avoid undefined
    Type.map((category, index) => {
      if (item.category === category[0]) {
        categoryTheme = category;
      }
    });

    let stock: Price = item.stock ? {...item.stock[0]} : {} as Price;
    let table_meta_data = Object.keys(stock) 

    return (
      <View style={[styles.inventoryItem]}>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>  
          <Text style={{fontWeight: 800, fontSize: isTablet ? 22 : 16}}>{item.name}</Text>
          <View
            style={{
              backgroundColor: categoryTheme[1],
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{color: categoryTheme[2]}}>{item.category}</Text>
          </View>
        </View>
        <View style={{width: "100%"}}>
          <Text style={{textAlign: "left", width: "100%", marginTop: 10}}>Available Stock</Text>
          <View style={{marginTop: 5}}>
            <View style={{flexDirection: "row", justifyContent: "space-between",}}>
              { table_meta_data.map((header, hid) => {
                if (header !== "_id") {
                  return (
                    <LinearGradient
                      style={{width: "33%", padding: 8, borderRadius: 8, }}
                      colors={
                        hid == 0 ? ["#009688", "#80CBC4"] : hid == 1 ? ["#2CAE6B", "#79D2A0"] : ["#1B8A52", "#72BF6A"]
                      }
                    >
                      <Text style={{color: "white", textAlign: "center"}}>{(header.length > 7 ? header.slice(0, 7) : header).toUpperCase()}</Text>
                    </LinearGradient>
                  )
                }
              }) }
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        style={{ marginTop: 20 }}
      >
        {categories.map((category, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => { filterInventoryList(category) }}>
              <View
                style={[
                  {
                    padding: 10,
                    backgroundColor: config.primaryColor,
                    borderRadius: 10,
                    paddingHorizontal: 25,
                  },
                  currentCategory === category && {
                    backgroundColor: config.textPrimaryColor,
                  },
                ]}>
                <Text
                  style={[
                    {
                      fontSize: isTablet ? 18 : 14,
                      fontWeight: 600,
                    },
                    currentCategory === category && {
                      color: config.backgroundColor,
                    },
                  ]}
                >{category}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <FlatList
        data={selectedInventory}
        numColumns={isTablet ? 3 : 1}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item._id || item.name}
        ListEmptyComponent={<Text>No Products found.</Text>}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 0,
          paddingBottom: 15,
        }}
        columnWrapperStyle={
          isTablet && { justifyContent: "space-between", gap: 20 }
        } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isTablet ? 10 : 0,
  },
  inventoryItem: {
    padding: 10,
    minWidth: "100%",
    alignItems: isTablet ? "baseline" : "center",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  inventoryItemInfo: {
    marginLeft: isTablet ? 0 : 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    padding: 20,
    width: "80%",
    backgroundColor: "#fff",
  },
  modalItem: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  modalItemInfo: {
    marginLeft: 20,
  },
});