import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import * as FileSystem from "expo-file-system";
import axios from "axios";

import { UserProps } from "../../../../interfaces/user";
import { Role } from "../../../../data/constants";
import { AssetType } from "../../../../interfaces/asset";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;



export default function NewStaff({ config, ip }: any) {
  const [loading, setLoading] = useState(false);
  const [resourceState, setResourceState] = useState(false);
  const [image, setImage] = useState<AssetType>();
  const [user, setUser] = useState<UserProps>({
    fname: "",
    lname: "",
    username: "",
    password: "",
    gender: "",
    nic: "",
    contact: "",
    address: "",
    role: "",
    dob: "",
  });

  const pickImage = async () => {
    setResourceState(true);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      console.log("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setResourceState(false);
    } else {
      setResourceState(false);
    }
  };

  const handleInputTextChange = (name: keyof UserProps, value: string) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reset = () => {
    setUser((prevState) => ({
      ...prevState,
      fname: "",
      lname: "",
      username: "",
      password: "",
      gender: user.gender,
      nic: "",
      contact: "",
      address: "",
      role: user.role,
      dob: "",
    }));
    setImage(undefined);
  };

  const roleItems = Role.map((role) => ({
    label: role,
    value: role,
  }));

  const handleCreateStaff = async () => {
    setLoading(true);
    try {
      // Prepare the data object
      const staffData: any = {
        fname: user.fname,
        lname: user.lname,
        username: "N/A",
        password: "N/A",
        dob: user.dob,
        nic: user.nic,
        contact: user.contact,
        address: user.address,
        role: user.role,
        gender: user.gender,
        joined: new Date().toISOString(),
        layoff: "N/A",
      };

      // Convert image to base64 if present
      if (image) {
        const fileExtension = image.uri.split(".").pop()?.toLowerCase();
        const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";
        const base64Data = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        staffData.image = `data:${mimeType};base64,${base64Data}`; // Full data URI
      }
      // Send as JSON
      const response = await axios.post(`http://${ip}:3000/staff/create`, staffData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.msg === "added") {
        reset();
      }
    } catch (error: any) {
      console.log("Error:", error.message);
      if (error.response) {
        console.log("Server Error Response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="First Name"
          placeholderTextColor={config.textSecondary}
          value={user.fname}
          onChangeText={(text) => handleInputTextChange("fname", text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="Last Name"
          placeholderTextColor={config.textSecondary}
          value={user.lname}
          onChangeText={(text) => handleInputTextChange("lname", text)}
        />
        <View style={[styles.input, { padding: 0, borderRadius: 10 }]}>
          <RNPickerSelect
            onValueChange={(value) => handleInputTextChange("role", value)}
            items={roleItems}
            placeholder={{ label: "Assign Role", value: null }}
          />
        </View>
        <View style={[styles.input, { padding: 0, borderRadius: 10 }]}>
          <RNPickerSelect
            onValueChange={(value) => handleInputTextChange("gender", value)}
            style={{
              inputAndroid: {
                textAlignVertical: "top"
              },
            }}
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            placeholder={{
              label: "Select Gender",
              value: null,
            }}
          />

        </View>
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="Date of Birth"
          placeholderTextColor={config.textSecondary}
          value={user.dob}
          onChangeText={(text) => handleInputTextChange("dob", text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="NIC"
          placeholderTextColor={config.textSecondary}
          value={user.nic}
          onChangeText={(text) => handleInputTextChange("nic", text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="Mobile"
          placeholderTextColor={config.textSecondary}
          value={user.contact}
          onChangeText={(text) => handleInputTextChange("contact", text)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: config.backgroundColor, borderRadius: 10 }]}
          placeholder="Address"
          placeholderTextColor={config.textSecondary}
          value={user.address}
          onChangeText={(text) => handleInputTextChange("address", text)}
        />
        {image && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200, marginBottom: 15, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => pickImage()}>
          <Text
            style={[
              styles.buttonText,
              { backgroundColor: config.primaryColor, borderRadius: 10, marginBottom: 15 },
            ]}
          >
            Pick Image
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => handleCreateStaff()}>
            <View
              style={[
                styles.buttonStyle,
                { backgroundColor: config.buttonPrimaryColor, borderRadius: 10 },
              ]}
            >
              <Text style={[styles.buttonText, { color: config.backgroundColor }]}>
                Create Staff
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => reset()}>
            <View
              style={[
                styles.buttonStyle,
                { backgroundColor: config.surfaceColor, borderRadius: 10 },
              ]}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 30,
  },
  heading: {
    fontSize: 18,
    paddingTop: 30,
  },
  input: {
    marginBottom: 15,
    padding: 16,
    borderWidth: 1,
  },
  buttonGroup: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    paddingBottom: isTablet ? 0 : 25,
    width: "100%",
    gap: isTablet ? "2.5%" : 0,
  },
  buttonStyle: {
    flexShrink: 1,
    width: "auto",
    marginBottom: isTablet ? 0 : 15,
    maxWidth: isTablet ? "95%" : "100%",
  },
  buttonText: {
    fontSize: 16,
    padding: 15,
    textAlign: "center",
  },
});