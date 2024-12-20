import Navbar from "@/components/layout/navbar";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}
