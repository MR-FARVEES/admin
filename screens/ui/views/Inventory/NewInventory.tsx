import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { Inventory, Price } from "../../../../interfaces/inventory";
import { Type, Unit } from "../../../../data/constants";

const { width } = Dimensions.get("screen");
const isTablet = width > 600

export default function NewInventory({ config, ip }: any) {
    const [inventory, setInventory] = useState<Inventory>({
        name: "",
        unit: "",
        category: "",
    });

    const [price, setPrice] = useState<Price>({
        price: "",
        qty: "",
        date: "",
    });

    const handleInventoryInputChange = (name: keyof Inventory, value: string) => {
        setInventory({...inventory, [name]: value});
    };

    const handlePriceInputChange = (name: keyof Price, value: string) => {
        setPrice({...price, [name]:value});
    };

    const reset = () => {
        setInventory({
            name: "",
            unit: "",
            category: "",
        });
        setPrice({
            price: "",
            qty: "",
            date: "",
        })
    }

    const handleCreateInventory = async () => {
        const inv: any = {
            name: inventory.name,
            unit: inventory.unit,
            category: inventory.category,
            price: price.price,
            qty: price.qty,
            date: Date.now()
        };
        
        try {
            const response = await axios.post(`http:/${ip}:3000/inventory/create`, inv);
            if (response.data.msg === "added") {
                reset();
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const typeItems = Type.map((type) => ({
        label: type[0],
        value: type[0]
    }));

    const unitItems = Unit.map((unit) => ({
        label: unit[0],
        value: unit[0]
    }))

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input]}
                value={inventory.name}
                onChangeText={(value) => handleInventoryInputChange("name", value)}
                placeholder="Inventory Item" />
            <View style={[styles.input, {paddingLeft: 0, padding: 0}]}>
                <RNPickerSelect
                    placeholder={{label: "Choose Type", value: null}}
                    items={typeItems}
                    onValueChange={(value) => handleInventoryInputChange("category", value)} />
            </View>
            <View style={[styles.input, {paddingLeft: 0, padding: 0}]}>
                <RNPickerSelect
                    placeholder={{label: "Choose Unit", value: null}}
                    items={unitItems}
                    onValueChange={(value) => handleInventoryInputChange("unit", value)} />
            </View>
            <TextInput
                style={[styles.input]}
                value={price.price}
                onChangeText={(value) => handlePriceInputChange("price", value)}
                placeholder="Price" />
            <TextInput
                style={[styles.input]}
                value={price.qty}
                onChangeText={(value) => handlePriceInputChange("qty", value)}
                placeholder="Quanity" />
            <TouchableOpacity
                onPress={() => { handleCreateInventory() }}>
                <View style={[styles.button, { backgroundColor: config.textPrimaryColor }]}>
                    <Text style={[styles.buttonText, {color: config.backgroundColor}]}>Create</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { reset() }}>
                <View style={[styles.button, { backgroundColor: config.surfaceColor }]}>
                    <Text style={[styles.buttonText, {color: config.textPrimaryColor}]}>Clear</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "15%",
        width: isTablet ? "70%" : "100%",
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        fontSize: isTablet ? 18 : 14,
        marginBottom: 15,
    },
    button: {
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: "center", 
        fontSize: isTablet ? 20 : 14,
    }
})      