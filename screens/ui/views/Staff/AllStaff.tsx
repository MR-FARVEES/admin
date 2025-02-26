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
    <TouchableOpacity style={styles.staffItem}>
      {item.image && (
        <Image
          source={{ uri: `http://${ip}:3000${item.image}` }} // Base64 string works directly
          style={styles.staffImage}
        />
      )}

      <View style={styles.staffDetails}>
        <Text style={[styles.staffName, { color: config.textPrimary }]}>
          {item.fname} {item.lname} 
        </Text>
        <Text style={[styles.staffText, { color: config.textSecondary }]}>
          Role: {item.role}
        </Text>
        <Text style={[styles.staffText, { color: config.textSecondary }]}>
          NIC: {item.nic}
        </Text>
        <Text style={[styles.staffText, { color: config.textSecondary }]}>
          Joined: {new Date(item.joinedDate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <FlatList
        data={staffList}
        renderItem={renderStaffItem}
        keyExtractor={(item) => item._id}
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
    paddingTop: 30,
  },
  staffItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  staffImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  staffDetails: {
    flex: 1,
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  staffText: {
    fontSize: 14,
    marginBottom: 2,
  },
});