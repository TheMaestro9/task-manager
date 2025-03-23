// components/ui/form/TextArea.tsx

import { TextareaHTMLAttributes, useRef, useEffect, useCallback } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormErrorMsg from "./form-error-msg";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  minHeight?: number; // in pixels
  maxHeight?: number; // in pixels
}

export default function TextArea({
  label,
  register,
  error,
  minHeight = 60,
  maxHeight = 300,
  ...rest
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset first
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [maxHeight]);

  useEffect(() => {
    resizeTextarea(); // on mount or value change
  }, [resizeTextarea, rest.value]);

  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        {...register}
        {...rest}
        ref={(e) => {
          register.ref(e); // register with RHF
          textareaRef.current = e; // also keep our local ref
        }}
        onInput={resizeTextarea}
        style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        className={`w-full border rounded px-3 py-2 resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <FormErrorMsg message={error} />
    </div>
  );
}
