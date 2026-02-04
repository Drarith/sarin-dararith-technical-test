import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import Login from "@/components/loginScreen/login";
import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (status === "loggedIn") {
    return <Redirect href="/home/home" />;
  }

  return (
    <View className="flex-1">
      <Login />
    </View>
  );
}
