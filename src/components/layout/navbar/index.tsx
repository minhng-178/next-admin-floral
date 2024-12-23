import React from "react";
import { UserButton } from "@clerk/nextjs";
import { LangToggle, ThemeToggle } from "@/components/common";

const PrivateNav = () => {
  return (
    <div className="py-3 px-4 border-0 flex items-center justify-end  gap-6 border-b">
      <div className="flex justify-center items-center gap-4">
        <LangToggle />
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default React.memo(PrivateNav);
