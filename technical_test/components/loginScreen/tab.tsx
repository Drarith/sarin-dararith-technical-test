import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

type Tabs = "email" | "phone";

export default function LoginScreenTab() {
  const [tab, setTab] = useState<Tabs>("email");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const isEmail = tab === "email";
  const contactPlaceholder = useMemo(
    () => (isEmail ? "Email" : "XXX XXX XXX XXX"),
    [isEmail],
  );

  return (
    <View>
      <View className="flex-row">
        {/* Email / Phone toggle */}
        <Pressable
          onPress={() => setTab("email")}
          className={`flex-1 items-center pb-3 border-b-2 ${tab === "email" ? "border-accent" : "border-textColor/10"}`}
        >
          <Text className="text-lg text-heading">Email</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab("phone")}
          className={`flex-1 items-center pb-3 border-b-2 ${tab === "phone" ? "border-accent" : "border-textColor/10"}`}
        >
          <Text className="text-lg text-heading">Phone</Text>
        </Pressable>
      </View>

      <View className="mx-1.5 mt-3.5 h-14 flex-row items-center rounded-lg border border-black/10 bg-black/5 ">
        {/* Switch between mail and phone number */}
        {isEmail ? (
          <View className="w-9 items-center justify-center ">
            <Feather name="mail" size={18} color="black" />
          </View>
        ) : (
          <View className="h-full w-20 items-center justify-center border-r border-inputBorder">
            <Text className="text-base text-textColor">🇰🇭 +855</Text>
          </View>
        )}

        <TextInput
          placeholder={contactPlaceholder}
          placeholderTextColor="grey"
          keyboardType={isEmail ? "email-address" : "phone-pad"}
          autoCapitalize="none"
          className={`flex-1 pr-3 text-base text-inputText mb-0.5 ${isEmail ? "pl-0" : "pl-2.5"}`}
        />
      </View>

      <View className="mx-1.5 mt-3.5 h-14 flex-row items-center rounded-lg border border-inputBorder bg-black/5">
        <View className="w-9 items-center justify-center">
          <Feather name="lock" size={18} color="black" />
        </View>

        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={passwordHidden}
          autoCapitalize="none"
          className="flex-1 pr-3 text-base text-inputText"
        />

        <Pressable
          hitSlop={8}
          onPress={() => setPasswordHidden((prev) => !prev)}
          className="mr-0.5 w-9 items-center justify-center"
        >
          <MaterialCommunityIcons
            name={passwordHidden ? "eye-off-outline" : "eye-outline"}
            size={18}
            color="black"
          />
        </Pressable>
      </View>

      <Pressable>
        <Text className="mt-6 text-center text-base font-medium text-accent">
          Forgot password
        </Text>
      </Pressable>

      <Pressable className="mx-1.5 mt-7 h-14 items-center justify-center rounded-full bg-accent">
        <Text className="text-lg font-medium text-buttonText">Continue</Text>
        <View className="absolute right-6">
          <Feather name="arrow-right" size={20} color="black" />
        </View>
      </Pressable>
    </View>
  );
}
