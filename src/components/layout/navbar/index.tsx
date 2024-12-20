import React from "react";
import { LangToggle } from "@/components/common";
import { UserButton } from "@clerk/nextjs";
const PrivateNav = () => {
  return (
    <div className="py-3 px-4 border-0 flex items-center justify-end  gap-6 border-b">
      <div className="flex justify-center items-center gap-4">
        <LangToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default React.memo(PrivateNav);
