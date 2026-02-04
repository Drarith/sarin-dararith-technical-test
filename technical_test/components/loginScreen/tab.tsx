import { useState } from "react";
import { Alert, Keyboard, Pressable, Text, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  loginSchema,
  type FormLoginData,
  type LoginMode,
} from "@/validation/validationSchema";
import FormInput from "@/components/form/formInput";
import { postJSON } from "@/http/http";
import type { ApiError } from "@/http/http";
import { setTokens } from "@/storage/authToken";
import { set } from "zod";

export default function LoginScreenTab() {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const {
    control,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: zodResolver(loginSchema),
    // mode declared here
    defaultValues: { mode: "email", contact: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: false,
  });
  // watch different mode defined in validationSchema
  const tab = watch("mode");
  const isEmail = tab === "email";
  const contactPlaceholder = isEmail ? "Email" : "XXX XXX XXX XXX";

  const loginMutation = useMutation({
    mutationFn: async (data: FormLoginData) => {
      const payload =
        data.mode === "email"
          ? { email: data.contact, password: data.password }
          : { countryCode: "855", phone: data.contact, password: data.password };
      return postJSON("/auth/login", payload);
    },
    onSuccess: async (result) => {
        const { accessToken, refreshToken } = result.data;
      console.log("Login response:", result);
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      await setTokens(accessToken, refreshToken);
      Alert.alert("Success", "Login successful");
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      const message = error.title ? error.title + "\n" + error.message : "Login failed";
      Alert.alert("Error", message);
    },
  });

  const switchTab = (nextTab: LoginMode) => {
    if (nextTab === tab) return;
    Keyboard.dismiss();
    setPasswordHidden(true);
    clearErrors(["contact", "password"]);
    // change mode value to active tab
    setValue("mode", nextTab);
    setValue("contact", "");
  };

  return (
    <View>
      <View className="flex-row">
        <Pressable
          onPress={() => switchTab("email")}
          className={`flex-1 items-center border-b-2 pb-3 ${tab === "email" ? "border-accent" : "border-textColor/10"}`}
        >
          <Text className="text-lg text-heading">Email</Text>
        </Pressable>
        <Pressable
          onPress={() => switchTab("phone")}
          className={`flex-1 items-center border-b-2 pb-3 ${tab === "phone" ? "border-accent" : "border-textColor/10"}`}
        >
          <Text className="text-lg text-heading">Phone</Text>
        </Pressable>
      </View>

      <View className="mx-1.5 mt-3.5 h-14 flex-row items-center rounded-lg border border-black/10 bg-black/5">
        {isEmail ? (
          <View className="w-9 items-center justify-center">
            <Feather name="mail" size={18} color="black" />
          </View>
        ) : (
          <View className="h-full w-20 items-center justify-center border-r">
            <Text className="text-base leading-5 text-textColor">🇰🇭 +855</Text>
          </View>
        )}

        <FormInput<FormLoginData>
          control={control}
          name="contact"
          trigger={trigger}
          placeholder={contactPlaceholder}
          placeholderTextColor="grey"
          keyboardType={isEmail ? "email-address" : "phone-pad"}
          autoCapitalize="none"
          autoCorrect={false}
          textAlignVertical="center"
          inputClassName={`h-full flex-1 pr-3 text-base leading-5 text-inputText ${isEmail ? "" : "pl-2.5"}`}
        />
      </View>
      {errors.contact && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {errors.contact.message}
        </Text>
      )}

      <View className="mx-1.5 mt-3.5 h-14 flex-row items-center rounded-lg border border-inputBorder bg-black/5">
        <View className="w-9 items-center justify-center">
          <Feather name="lock" size={18} color="black" />
        </View>

        <FormInput<FormLoginData>
          control={control}
          name="password"
          trigger={trigger}
          placeholder="Password"
          secureTextEntry={passwordHidden}
          textAlignVertical="center"
          inputClassName="h-full flex-1 pr-3 text-base leading-5 text-inputText"
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
      {errors.password && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {errors.password.message}
        </Text>
      )}

      <Pressable>
        <Text className="mt-6 text-center text-base font-medium text-accent">
          Forgot password
        </Text>
      </Pressable>

      <Pressable
        disabled={loginMutation.isPending}
        onPress={handleSubmit((data) => loginMutation.mutate(data))}
        className={`mx-1.5 mt-7 h-14 items-center justify-center rounded-full  ${loginMutation.isPending ? "bg-gray-400" : "bg-accent"}`}
      >
        <Text className="text-lg font-medium">
          {loginMutation.isPending ? "Signing in..." : "Continue"}
        </Text>
        {!loginMutation.isPending && (
          <View className="absolute right-6">
            <Feather name="arrow-right" size={20} color="black" />
          </View>
        )}
      </Pressable>
    </View>
  );
}
