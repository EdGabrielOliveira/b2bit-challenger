import React from "react";
import { Input } from "./ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string;
}

export default function InputComponent({ label, placeholder, error, ...props }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-800 font-bold">{label}</label>
      <Input
        className="text-sm border-none bg-gray-200 rounded-md py-5 focus-visible:ring-0"
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
