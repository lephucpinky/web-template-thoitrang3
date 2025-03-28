import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type SelectTypeProps = {
  data?: { value: string; id: string }[];
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  error?: string;
};

const SelectType: React.FC<SelectTypeProps> = ({
  data,
  label,
  className,
  disabled,
  value,
  onChange,
  error,
}) => {
  return (
    <div
      className={`flex w-full max-w-md flex-col gap-1.5 ${className} bg-White font-sans font-normal text-Charcoal`}
    >
      <Label>{label}</Label>
      <Select disabled={disabled} onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`w-full min-w-48 ${
            disabled
              ? "cursor-not-allowed border-solid bg-[#e5e7e9] border border-LightSilver font-bold text-Black" // Disabled styles
              : "cursor-pointer bg-White text-Black border border-LightSilver" // Default styles
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-White w-full border border-LightSilver">
          <SelectGroup>
            {data &&
              data.map((item) => (
                <SelectItem key={item.id} value={item.id} className="bg-White ">
                  {item.value}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <div className="font-sans text-[12px] font-normal text-PersianRed">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectType;
