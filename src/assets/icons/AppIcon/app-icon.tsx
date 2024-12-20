import { Flower } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppIconProps {
  className?: string;
  state?: "expanded" | "collapsed";
}

const AppIcon: React.FC<AppIconProps> = (props) => {
  const { className, state } = props;
  return (
    <Link
      href="/dashboard"
      className={`flex items-center gap-2 justify-center font-medium ${className}`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Flower className="size-4" />
      </div>
      {state === "expanded" && <p className="text-lg"> Floral Shop</p>}
    </Link>
  );
};

export default React.memo(AppIcon);
