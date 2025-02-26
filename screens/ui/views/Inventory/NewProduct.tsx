import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import RNPickerSelect from "react-native-picker-select";

import { Category } from "../../../../data/constants";
import { ProductProps } from "../../../../interfaces/product";
import { AssetType } from "../../../../interfaces/asset";
import axios from "axios";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

export default function NewProduct({ config, ip }: any) {
    const [image, setImage] = useState<AssetType>();
    const [resourceState, setResourceState] = useState(false);
    const [product, setProduct] = useState<ProductProps>({
        name: "",
        price: "",
        qty: "",
        cost: "",
        category: "",
        image: "",
    });

    const reset = () => {
        setProduct({
            name: "",
            price: "",
            qty: "",
            cost: "",
            category: product.category,
            image: "",
        });
        setImage(undefined);
    }

    const handleInputChange = (name: keyof ProductProps, value: string) => {
        setProduct({ ...product, [name]: value });
    }

    const pickImage = async () => {
        setResourceState(true);
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted === false) {
            console.log("Permission required");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            setResourceState(false);
        } else {
            setResourceState(false);
        }
    };

    const handleCreateProduct = async () => {
        try {
            const ProductData: any = {
                name: product.name,
                price: parseFloat(product.price),
                qty: parseInt(product.qty),
                cost: parseFloat(product.cost),
                category: product.category,
                lastModified: "N/A",
                modifiedBy: "N/A",
            }
            if (image) {
                const fileExtension = image.uri.split(".").pop();
                const mimeType = fileExtension === "jpg" ? "image/jpeg" : "image/png";
                const base64Data = await FileSystem.readAsStringAsync(image.uri, { 
                    encoding: FileSystem.EncodingType.Base64
                });
                ProductData.image = `data:${mimeType};base64,${base64Data}`;
            }
            const response = await axios.post(`http://${ip}:3000/product/create`, ProductData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (response.data.msg === "added") {
                reset();
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const productItems = Category.map((category) => ({
        label: category,
        value: category,
    }));

    return (
        <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
            <ScrollView>
                <TextInput
                    style={[styles.input, { borderColor: config.textColor }]}
                    placeholder="Product name"
                    value={product.name}
                    onChangeText={(text) => handleInputChange("name", text)} />
                
                <View style={{ marginBottom: 15, borderWidth: 1, borderRadius: 10, borderColor: config.textColor }}>
                    <RNPickerSelect
                        onValueChange={(value) => handleInputChange("category", value)}
                        items={productItems}
                        placeholder={{ label: "Select Category", value: null }} />
                </View>
                <TextInput
                    style={[styles.input, { borderColor: config.textColor }]}
                    placeholder="Product price"
                    value={product.price.toString()}
                    onChangeText={(text) => handleInputChange("price", text)}
                    keyboardType="numeric" />
                <TextInput
                    style={[styles.input, { borderColor: config.textColor }]}
                    placeholder="Unit cost"
                    value={product.cost.toString()}
                    onChangeText={(text) => handleInputChange("cost", text)}
                    keyboardType="numeric" />
                <TextInput
                    style={[styles.input, { borderColor: config.textColor }]}
                    placeholder="Quantity"
                    value={product.qty.toString()}
                    onChangeText={(text) => handleInputChange("qty", text)}
                    keyboardType="numeric" />
                {image && <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 15, }}>
                    <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                </View>}
                <TouchableOpacity
                    onPress={pickImage}>
                    <View style={[styles.button, { backgroundColor: config.primaryColor, borderRadius: 10 }]}>
                        <Text style={{ color: config.textColor, textAlign: "center" }}>Add Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCreateProduct}>
                    <View style={[styles.button, { backgroundColor: config.buttonPrimaryColor, borderRadius: 10 }]}>
                        <Text style={{ color: config.backgroundColor, textAlign: "center" }}>Create</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={reset}>
                    <View style={[styles.button, { backgroundColor: config.surfaceColor, borderRadius: 10 }]}>
                        <Text style={{ color: config.textPrimaryColor, textAlign: "center" }}>Clear</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 16,
        marginBottom: 15,
    },
    button: {
        padding: 16,
        marginBottom: 15,
    }
});