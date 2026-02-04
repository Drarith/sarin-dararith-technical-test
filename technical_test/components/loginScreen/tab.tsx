import { View, Text, Pressable } from "react-native";
import { useState } from "react";

type Tabs = "email" | "phone";

export default function LoginScreenTab() {
  const [tab, setTab] = useState<Tabs>("email");

  return (
    <View>
      <View className="flex-row w-full ">
        <Pressable onPress={() => setTab("email")} className="pb-2 flex-1">
          <Text className="text-base text-center font-semibold text-textColor px-10">
            Email
          </Text>
          <View
            className={`h-0.5 mt-2 ${tab === "email" ? "bg-accent" : "bg-textColor/10"}`}
          />
        </Pressable>

        <Pressable onPress={() => setTab("phone")} className="pb-2 flex-1">
          <Text className="text-base text-center font-semibold text-textColor px-10">
            Phone
          </Text>
          <View
            className={`h-0.5 mt-2 ${tab === "phone" ? " bg-accent" : "bg-textColor/10"}`}
          />
        </Pressable>
      </View>
    </View>
  );
}
