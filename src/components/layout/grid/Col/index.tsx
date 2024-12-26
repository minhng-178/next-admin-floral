import { cn } from "@/lib/utils";
import React from "react";

interface ColProps {
  label: string;
  value: React.ReactNode;
  labelClassname?: string;
  valueClassname?: string;
}

const Col: React.FC<ColProps> = ({
  label,
  value,
  labelClassname,
  valueClassname,
}) => {
  return (
    <div className="flex flex-col items-start">
      <span className={cn("text-neutral-500 text-sm", labelClassname)}>
        {label}
      </span>
      <span className={cn("text-neutral-900 text-sm", valueClassname)}>
        {value}
      </span>
    </div>
  );
};

export default React.memo(Col);
