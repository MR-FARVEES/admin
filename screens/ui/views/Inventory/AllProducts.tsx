import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    TouchableOpacity, 
    Modal 
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
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

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`http:/${ip}:3000/product/all`);
            setProductList(response.data);
        } catch (error) { console.warn(error); }
    }

    const handleModalDataChange = (_id: string, name: string, price: number, cost: number, qty: number, image: string) => {
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
    }

    const renderProductItem = ({ item }: { item: ProducType }) => (
        <View style={style.productItem}>
            <Image source={{
                uri: `http:/${ip}:3000${item.image}`
            }}
            style={{
                width: 72,
                height: 72,
                borderRadius:36
            }}/>
            <View style={style.productItemInfo}>
                <Text style={{fontSize: 18, fontWeight: 700}}>{item.name}</Text>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginRight: 20, width: 70}}>Price (Rs)</Text>
                    <Text>{item.price}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginRight: 20, width: 70}}>Cost (Rs)</Text>
                    <Text>{item.cost}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginRight: 20, width: 70}}>Quantity</Text>
                    <Text>{item.qty}</Text>
                </View>
            </View>
            <View style={[style.productItemInfo, {alignItems: "flex-end", flexGrow: 1}]}>
                <TouchableOpacity
                    onPress={() => handleModalDataChange(item._id, item.name, item.price, item.cost, item.qty, item.image)}>
                    <View>
                        <Feather name={"edit"} size={25} color={config.textPrimaryColor}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={style.container}>
            <FlatList
                data={productList}
                renderItem={renderProductItem}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                    <Text>
                        No Products found.
                    </Text>
                }/>
            <Modal
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={style.modalOverlay}>
                    <View style={style.modalView}>
                        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                            <Text>Edit <Text style={{ color: config.primaryColor, fontSize:16, fontWeight: 600}}>{modalData.name}</Text></Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}>
                                <View>
                                    <Ionicons name={"close-outline"} size={25} color={"green"}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={style.modalItem}>
                            <Image source={{ uri: `http://${ip}:3000${modalData.image}` }}
                                style={{width:72, height: 72, borderRadius: 10}}/>
                            <View style={[style.modalItemInfo, {borderColor: config.backgroundColor}]}>

                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    productItem: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    productItemInfo: {
        marginLeft: 20
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        padding: 20,
        width: "80%",
        backgroundColor: "#fff"
    },
    modalItem: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    modalItemInfo: {
        marginLeft: 20
    },
})