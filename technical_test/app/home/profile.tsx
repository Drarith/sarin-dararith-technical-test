import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJSON } from "@/http/http";
import { getAccessToken } from "@/storage/authToken";

type Gender = "male" | "female";

type UserData = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "Male" | "Female";
  countryCode: string;
  phone: string;
};

type UserProfileResponse = {
  data: UserData;
  message: string;
  title: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender>("male");

  const { data: user, isLoading, error } = useQuery<UserData>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("No auth token found");
      }
      const response = (await getJSON("/users/me", token)) as UserProfileResponse;
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-3">
        <Text className="text-center text-red-500">
          {error instanceof Error ? error.message : "Failed to load profile"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 mt-14 px-3 pt-3">
      <Pressable className="mb-4 w-8" onPress={() => router.back()}>
        <Feather name="chevron-left" size={22} color="black" />
      </Pressable>

      <Text className="mb-4 text-3xl font-medium text-heading">Profile</Text>

      <View className="mb-2 flex-row gap-2">
        <TextInput
          editable={false}
          value={user?.firstName || ""}
          className="h-12 flex-1 rounded-md border border-black/10 bg-black/5 px-3 text-base text-black"
        />
        <TextInput
          editable={false}
          value={user?.lastName || ""}
          className="h-12 flex-1 rounded-md border border-black/10 bg-black/5 px-3 text-base text-black"
        />
      </View>

      <View className="mb-3 h-12 flex-row items-center rounded-md border border-black/10 bg-black/5 px-3">
        <Feather name="mail" size={16} color="black" />
        <TextInput
          editable={false}
          value={user?.email || ""}
          className="ml-2 flex-1 text-base text-black"
        />
      </View>

      <View className="flex-row items-center">
        <Text className="mr-4 text-base text-black">Gender</Text>

        <Pressable
          className="mr-3 flex-row items-center"
          onPress={() => setGender("male")}
        >
          <View className="mr-1 h-4 w-4 items-center justify-center rounded-full border border-black/40">
            {(user?.gender?.toLowerCase() || gender) === "male" && (
              <View className="h-2 w-2 rounded-full bg-accent" />
            )}
          </View>
          <Text className="text-sm text-black">Male</Text>
        </Pressable>

        <Pressable className="flex-row items-center" onPress={() => setGender("female")}>
          <View className="mr-1 h-4 w-4 items-center justify-center rounded-full border border-black/40">
            {(user?.gender?.toLowerCase() || gender) === "female" && (
              <View className="h-2 w-2 rounded-full bg-accent" />
            )}
          </View>
          <Text className="text-sm text-black">Female</Text>
        </Pressable>
      </View>
    </View>
  );
}
