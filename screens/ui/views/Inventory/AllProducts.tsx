import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

type ProducType = {
  _id: string;
  name: string;
  price: number;
  qty: number;
  cost: number;
  category: string;
  lastModified: string;
  modifiedBy: string;
  image: string; // Now a base64 string (e.g., "data:image/jpeg;base64,...")
  __v?: number;
};

export default function AllProducts({ config, ip }: any) {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProducType[]>([]);
  const [productList, setProductList] = useState<ProducType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    _id: "",
    name: "",
    price: 0,
    cost: 0,
    qty: 0,
    image: "",
  });

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    if (productList.length > 0) {
      filterProductList("All"); // Ensure filtering runs only after products are set
    }
  }, [productList]); // Runs only when productList updates

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`http:/${ip}:3000/product/all`);
      setProductList(response.data);
      let init = false;
      response.data.map((item: ProducType) => {
        updateCategories(item.category);
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleModalDataChange = (
    _id: string,
    name: string,
    price: number,
    cost: number,
    qty: number,
    image: string
  ) => {
    setModalData({
      ...modalData,
      _id: _id,
      name: name,
      price: price,
      cost: cost,
      qty: qty,
      image: image,
    });
    setModalVisible(true);
  };

  const renderProductItem = ({ item }: { item: ProducType }) => (
    <View
      style={[
        style.productItem,
        isTablet && {
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 20,
          elevation: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        },
      ]}
    >
      <Image
        source={{
          uri: `http:/${ip}:3000${item.image}`,
        }}
        style={{
          width: isTablet ? 200 : 72,
          height: isTablet ? 200 : 72,
          borderRadius: isTablet ? 10 : 36,
        }}
      />
      <Text
        style={{ fontSize: isTablet ? 22 : 18, fontWeight: 700, marginTop: 15 }}
      >
        {item.name}
      </Text>
      <View style={[{ flexDirection: "row" }, isTablet && { paddingTop: 15 }]}>
        <View style={style.productItemInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
                marginRight: 20,
                width: isTablet ? 80 : 65,
              }}
            >
              Price (Rs)
            </Text>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
              }}
            >
              {item.price}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
                marginRight: 20,
                width: isTablet ? 80 : 65,
              }}
            >
              Cost (Rs)
            </Text>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
              }}
            >
              {item.cost}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
                marginRight: 20,
                width: isTablet ? 80 : 65,
              }}
            >
              Quantity
            </Text>
            <Text
              style={{
                fontSize: isTablet ? 18 : 14,
              }}
            >
              {item.qty}
            </Text>
          </View>
        </View>
        <View
          style={[
            style.productItemInfo,
            isTablet && {
              alignItems: "flex-end",
              flexGrow: 1,
              justifyContent: "center",
              padding: 15,
            },
            !isTablet && {
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              handleModalDataChange(
                item._id,
                item.name,
                item.price,
                item.cost,
                item.qty,
                item.image
              )
            }
          >
            <View style={{ marginBottom: 10 }}>
              <Feather
                name={"edit"}
                size={25}
                color={config.textPrimaryColor}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const updateCategories = (category: string) => {
    setCategories((prev) => {
      if (!prev.includes(category)) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const filterProductList = (category: string) => {
    setCurrentCategory(category);

    if (category === "All") {
      setSelectedProduct(productList); // Set all products directly
    } else {
      const filteredProducts = productList.filter(
        (item) => item.category === category
      );
      setSelectedProduct(filteredProducts);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        style={{ margin: 20 }}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => filterProductList(category)}
            >
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
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 18,
                      fontWeight: 600,
                    },
                    currentCategory === category && {
                      color: config.backgroundColor,
                    },
                  ]}
                >
                  {category}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <FlatList
        data={selectedProduct}
        numColumns={isTablet ? 3 : 1}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No Products found.</Text>}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 25,
          paddingBottom: 15,
        }}
        columnWrapperStyle={
          isTablet && { justifyContent: "space-between", gap: 20 }
        }
      />
      <Modal
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>
                Edit{" "}
                <Text
                  style={{
                    color: config.primaryColor,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {modalData.name}
                </Text>
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View>
                  <Ionicons name={"close-outline"} size={25} color={"green"} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.modalItem}>
              <Image
                source={{ uri: `http://${ip}:3000${modalData.image}` }}
                style={{ width: 72, height: 72, borderRadius: 10 }}
              />
              <View
                style={[
                  style.modalItemInfo,
                  { borderColor: config.backgroundColor },
                ]}
              ></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isTablet ? 10 : 0,
  },
  productItem: {
    padding: 15,
    flexDirection: isTablet ? "column" : "row",
    alignItems: isTablet ? "baseline" : "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  productItemInfo: {
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
