// components/ui/form/Button.tsx

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-300 text-gray-800 hover:bg-red-400",
  };

  return (
    <button
      {...rest}
      className={clsx(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}
