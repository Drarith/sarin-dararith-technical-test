import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-xl font-semibold text-heading">Hello. Hope you are having a great day, bong.</Text>
      <Pressable
        onPress={() => router.push("/home/profile")}
        className="rounded-full bg-accent px-8 py-3"
      >
        <Text className="text-base font-medium text-black">Profile</Text>
      </Pressable>
    </View>
  );
}

