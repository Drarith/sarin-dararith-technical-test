import { TextInput, type TextInputProps } from "react-native";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type UseFormTrigger,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  trigger?: UseFormTrigger<T>;
  inputClassName?: string;
  // Omit to avoid duplication
} & Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;

/**
 * FormInput
 * Wraps a React Native TextInput with React Hook Form via useController.
 *
 * Notes:
 * - Always passes a string value (value ?? "") to keep TextInput controlled.
 * - Optional `trigger` validates this field on blur.
 *   blur validation while the form mode is onSubmit.
 * - Leaves error rendering to the parent layout.
 */
export default function FormInput<T extends FieldValues>({
  control,
  name,
  trigger,
  inputClassName,
  ...props
}: FormInputProps<T>) {
  const { field } = useController({ control, name });

  return (
    <TextInput
      {...props}
      onChangeText={field.onChange}
      onBlur={() => {
        field.onBlur();
        if (trigger) {
          void trigger(name);
        }
      }}
      value={(field.value ?? "")}
      className={inputClassName}
    />
  );
}
