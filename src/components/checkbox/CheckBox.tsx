import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

type CheckboxType = {
  id: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const CheckboxLabel: React.FC<CheckboxType> = ({
  id,
  label = 'Ưu tiên',
  checked,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onChange}
      />

      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxLabel;
