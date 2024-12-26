import { cn } from "@/lib/utils";
import React from "react";

interface RowProps {
  label: string;
  value: React.ReactNode;
  labelClassname?: string;
  valueClassname?: string;
}

const Row: React.FC<RowProps> = ({
  label,
  value,
  labelClassname,
  valueClassname,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className={cn("text-neutral-500 text-sm", labelClassname)}>
        {label}
      </span>
      <span className={cn("text-neutral-900 text-sm", valueClassname)}>
        {value}
      </span>
    </div>
  );
};

export default React.memo(Row);
