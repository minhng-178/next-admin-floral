import React from "react";
import { LangToggle } from "@/components/common";
import { Card } from "@/components/ui/card";
import { AppIcon } from "@/assets/icons";
import { UserButton } from "@clerk/nextjs";
const PrivateNav = () => {
  return (
    <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl">
      <AppIcon className="cursor-pointer" />

      <div className="flex justify-center items-center gap-4">
        <LangToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default React.memo(PrivateNav);
