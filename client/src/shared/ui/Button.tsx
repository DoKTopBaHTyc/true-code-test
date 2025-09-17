import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50",
  danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 disabled:bg-transparent",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
}: ButtonProps) {
  const baseClasses =
    "rounded-lg font-medium transition-colors disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  const classes =
    `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  );
}
