import { Flower } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppIconProps {
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = (props) => {
  const { className } = props;
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-medium ${className}`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Flower className="size-4" />
      </div>
      Floral Shop
    </Link>
  );
};

export default React.memo(AppIcon);
