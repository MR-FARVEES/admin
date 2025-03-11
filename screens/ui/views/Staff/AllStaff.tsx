import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
const isTablet = width > 600;

type StaffType = {
  _id: string;
  fname: string;
  lname: string;
  dateOfBirth: string;
  gender: string;
  nic: string;
  contact: string;
  address: string;
  role: string;
  salary: string;
  joinedDate: string;
  image?: string; // Now a base64 string (e.g., "data:image/jpeg;base64,...")
  __v?: number;
};

export default function AllStaff({ config, ip }: any) {
  const [staffList, setStaffList] = useState<StaffType[]>([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/staff/all`);
      setStaffList(response.data);
    } catch (error: any) {
      console.log("Error fetching staff list:", error.message);
    }
  };

  const renderStaffItem = ({ item }: { item: StaffType }) => (
    <View
      style={[
        styles.staffItem,
        isTablet && {
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 20,
          elevation: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)"
        }
      ]}
    >
      {item.image && (
        <Image
          source={{ uri: `http://${ip}:3000${item.image}` }} // Base64 string works directly
          style={[
            {
              width: isTablet ? 180 : 120,
              height: isTablet ? 180 : 120,
              borderRadius: 10,
            }
          ]}
        />
      )}
      <View style={[!isTablet && { marginLeft: 30}, isTablet && {margin: 0, padding: 0}]}>
        <Text style={[styles.staffName, { color: config.textPrimary }]}>
          {item.fname} {item.lname}
        </Text>
        <View>
          <View style={styles.staffDetails}>
            <Text style={[styles.staffText, { color: config.textSecondary }]}>
              <Text style={{ fontWeight: 700 }}>Position</Text>{"\n"}{item.role}
            </Text>
            <Text style={[styles.staffText, { color: config.textSecondary }]}>
              <Text style={{ fontWeight: 700 }}>Salary</Text>{"\n"}Rs. {item.salary}
            </Text>
          </View>
          <View style={[{ flexDirection: "row-reverse", gap: 20, marginLeft: 30, marginTop: 10, alignItems: "center" }]}>
            <TouchableOpacity>
                <View style={{ marginBottom: 10 }}>
                  <AntDesign name={"delete"} size={25} color={"red"} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ marginBottom: 10 }}>
                <Feather name={"edit"} size={25} color={config.textPrimaryColor} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={staffList}
        numColumns={isTablet ? 3 : 1}
        renderItem={renderStaffItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 25,
          paddingBottom: 15,
        }}
        columnWrapperStyle={
          isTablet && { justifyContent: "space-between", gap: 20 }
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: config.textSecondary }}>
            No staff members found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isTablet ? 30 : 0,
  },
  staffItem: {
    padding: 15,
    alignItems: "center",
    flexDirection: isTablet ? "column" : "row",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  staffImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: isTablet ? 0 : 15,
  },
  staffDetails: {
  },
  staffName: {
    marginTop: isTablet ? 0 : 15,
    fontSize: isTablet ? 24 : 18,
    fontWeight: 700,
    marginBottom: 5,
  },
  staffText: {
    fontSize: isTablet ? 20 : 14,
    marginBottom: 2,
  },
});