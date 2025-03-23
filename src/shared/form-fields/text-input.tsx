// components/ui/form/TextInput.tsx
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormErrorMsg from "./form-error-msg";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function TextInput({
  label,
  register,
  error,
  ...rest
}: TextInputProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...register}
        {...rest}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <FormErrorMsg message={error} />
    </div>
  );
}
