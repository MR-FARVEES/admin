import { View, Text, StyleSheet } from "react-native";

export default function DashboardView({ config, ip }: any) {
  return (
    <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
      <Text style={styles.heading}>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    marginTop: 40,

  }
});