import {  useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type {
  FormEmailData,
  FormPhoneData,
} from "@/validation/validationSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, phoneSchema } from "@/validation/validationSchema";

type Tabs = "email" | "phone";

export default function LoginScreenTab() {
  const [tab, setTab] = useState<Tabs>("email");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const isEmail = tab === "email";
  const contactPlaceholder = isEmail ? "Email" : "XXX XXX XXX XXX";

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<FormEmailData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: true,
  });

  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<FormPhoneData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: true,
  });

  const onEmailSubmit = (data: FormEmailData) => {
    console.log("Email form data:", data);
  };

  const onPhoneSubmit = (data: FormPhoneData) => {
    console.log("Phone form data:", data);
  };

  const switchTab = (next: Tabs) => {
    if (next === tab) return;
    Keyboard.dismiss();
    setPasswordHidden(true);
    setTab(next);
  };

  return (
    <View>
      <View className="flex-row">
        {/* Email / Phone toggle */}
        <Pressable
          onPress={() => switchTab("email")}
          className={`flex-1 items-center pb-3 border-b-2 ${tab === "email" ? "border-accent" : "border-textColor/10"}`}
        >
          <Text className="text-lg text-heading">Email</Text>
        </Pressable>
        <Pressable
          onPress={() => switchTab("phone")}
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
            <Text className="text-base text-textColor leading-5">🇰🇭 +855</Text>
          </View>
        )}

        {isEmail ? (
          <Controller
            key="email-contact"
            control={emailControl}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={contactPlaceholder}
                placeholderTextColor="grey"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ?? ""}
                textAlignVertical="center"
                className="h-full flex-1 pr-3 text-base leading-5 text-inputText"
              />
            )}
          />
        ) : (
          <Controller
            key="phone-contact"
            control={phoneControl}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={contactPlaceholder}
                keyboardType="phone-pad"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ?? ""}
                textAlignVertical="center"
                className="h-full flex-1 pr-3 pl-2.5 text-base leading-5 text-inputText"
              />
            )}
          />
        )}
      </View>
      {isEmail && emailErrors.email && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {emailErrors.email.message}
        </Text>
      )}
      {!isEmail && phoneErrors.phoneNumber && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {phoneErrors.phoneNumber.message}
        </Text>
      )}

      <View className="mx-1.5 mt-3.5 h-14 flex-row items-center rounded-lg border border-inputBorder bg-black/5">
        <View className="w-9 items-center justify-center">
          <Feather name="lock" size={18} color="black" />
        </View>

        {isEmail ? (
          <Controller
            key="email-password"
            control={emailControl}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                secureTextEntry={passwordHidden}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ?? ""}
                textAlignVertical="center"
                className="h-full flex-1 pr-3 text-base leading-5 text-inputText"
              />
            )}
          />
        ) : (
          <Controller
            key="phone-password"
            control={phoneControl}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                secureTextEntry={passwordHidden}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ?? ""}
                textAlignVertical="center"
                className="h-full flex-1 pr-3 text-base leading-5 text-inputText"
              />
            )}
          />
        )}

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
      {isEmail && emailErrors.password && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {emailErrors.password.message}
        </Text>
      )}
      {!isEmail && phoneErrors.password && (
        <Text className="mx-1.5 mt-1 text-sm text-red-500">
          {phoneErrors.password.message}
        </Text>
      )}

      <Pressable>
        <Text className="mt-6 text-center text-base font-medium text-accent">
          Forgot password
        </Text>
      </Pressable>

      <Pressable
        onPress={
          isEmail
            ? handleEmailSubmit(onEmailSubmit)
            : handlePhoneSubmit(onPhoneSubmit)
        }
        className="mx-1.5 mt-7 h-14 items-center justify-center rounded-full bg-accent"
      >
        <Text className="text-lg font-medium text-buttonText">Continue</Text>
        <View className="absolute right-6">
          <Feather name="arrow-right" size={20} color="black" />
        </View>
      </Pressable>
    </View>
  );
}
