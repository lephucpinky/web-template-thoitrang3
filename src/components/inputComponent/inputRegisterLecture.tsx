import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type inputConfig = {
  labelText: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  placeholder?: string;
  value?: any;
  className?: string;
  error?: string;
  disabled?: boolean;
};
const InputConfig: React.FC<inputConfig> = ({
  labelText,
  type,
  onChange,
  name,
  placeholder,
  value,
  className,
  error,
  disabled,
}) => {
  return (
    <div
      className={`flex w-full max-w-md flex-col gap-1.5 ${className} font-sans font-normal text-Charcoal`}
    >
      <Label htmlFor="email">{labelText}</Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`${className} border border-LightSilver rounded-md`}
        multiple
        disabled={disabled}
      />
      {error && (
        <div className="font-sans text-[12px] font-normal text-PersianRed">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputConfig;
