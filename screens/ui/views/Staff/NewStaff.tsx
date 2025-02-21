import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { UserProps } from "../../../../interfaces/user";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

export default function NewStaff({ config, ip }: any) {
  const [user, setUser] = useState<UserProps>({
    fname: "",
    lname: "",
    username: "",
    password: "",
    nic: "",
    contact: "",
    address: "",
    dob: "",
  });

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
      nic: "",
      contact: "",
      address: "",
      dob: "",
    }));
  };

  const handleCreateStaff = async () => {
    try {
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="First Name"
          placeholderTextColor={config.textSecondary}
          value={user.fname}
          onChangeText={(text) => handleInputTextChange("fname", text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="Last Name"
          placeholderTextColor={config.textSecondary}
          value={user.lname}
          onChangeText={(text) => handleInputTextChange("lname", text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="Date of Birth"
          placeholderTextColor={config.textSecondary}
          value={user.dob}
          onChangeText={(text) => handleInputTextChange("dob", text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="NIC"
          placeholderTextColor={config.textSecondary}
          value={user.nic}
          onChangeText={(text) => handleInputTextChange("nic", text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="Mobile"
          placeholderTextColor={config.textSecondary}
          value={user.contact}
          onChangeText={(text) => handleInputTextChange("contact", text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: config.backgroundColor,
              borderRadius: 10,
            },
          ]}
          placeholder="Address"
          placeholderTextColor={config.textSecondary}
          value={user.address}
          onChangeText={(text) => handleInputTextChange("address", text)}
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => handleCreateStaff()}>
            <View
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: config.buttonPrimaryColor,
                  borderRadius: 10,
                },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: config.backgroundColor }]}
              >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 2,
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
