import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { clearTokens } from "@/storage/authToken";

export default function HomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 px-4 justify-start mt-28">
      <Text className="mb-6 text-xl font-semibold text-heading">
        Hello, bong. Hope you are having a great day.
      </Text>
      <Pressable
        onPress={() => router.push("/home/profile")}
        className="rounded-full bg-accent w-full py-3"
      >
        <Text className="text-base font-medium text-black text-center">Profile</Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          await clearTokens();
          router.replace("/");
        }}
        className="rounded-full bg-black/10 w-full py-3 mt-2"
      >
        <Text className="text-base font-medium text-black text-center">Logout</Text>
      </Pressable>
    </View>
  );
}
