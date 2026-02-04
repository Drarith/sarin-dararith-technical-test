import { Text, View } from "react-native";
import LoginScreenTab from "./tab";

export default function Login() {
  return (
    <View className="mt-5">
      <Text className="text-4xl font-medium ml-2">Login</Text>
      <View className="mt-10">
        <LoginScreenTab />
      </View>
    </View>
  );
}
