import { useState } from "react";
import { Pressable, Text, View, Keyboard } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type FormLoginData,
  type LoginMode,
} from "@/validation/validationSchema";
import FormInput from "@/components/form/formInput";

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

  const onSubmit = (data: FormLoginData) => {
    if (data.mode === "email") {
      console.log("Email form data:", { email: data.contact, password: data.password });
      return;
    }

    console.log("Phone form data:", { phoneNumber: data.contact, password: data.password });
  };

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
        <Text className="mx-1.5 mt-1 text-sm text-red-500">{errors.contact.message}</Text>
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
        <Text className="mx-1.5 mt-1 text-sm text-red-500">{errors.password.message}</Text>
      )}

      <Pressable>
        <Text className="mt-6 text-center text-base font-medium text-accent">
          Forgot password
        </Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="mx-1.5 mt-7 h-14 items-center justify-center rounded-full bg-accent"
      >
        <Text className="text-lg font-medium">Continue</Text>
        <View className="absolute right-6">
          <Feather name="arrow-right" size={20} color="black" />
        </View>
      </Pressable>
    </View>
  );
}
