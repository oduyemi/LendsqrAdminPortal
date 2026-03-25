import clsx from "clsx";
import React from "react";

interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  type = "button",
  loading = false,
  className,
}) => {
  return (
    <button
      type={type}
      className={clsx("primary-btn w-100", className)}
      disabled={loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};