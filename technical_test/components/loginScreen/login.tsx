import { Text, View } from "react-native";
import LoginScreenTab from "./tab";

export default function Login() {
  return (
    <View className="mt-20 px-3">
      <Text className="text-2xl font-medium">Login</Text>
      <View className="mt-10">
        <LoginScreenTab />
      </View>
    </View>
  );
}
