import { View, Text, StyleSheet } from "react-native";
import Login from "@/components/login";

export default function HomeScreen() {
  return (
    <View>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
