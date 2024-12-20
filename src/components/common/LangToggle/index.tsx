"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import vnFlag from "@/assets/images/flags/vietnam-flag.png";
import enFlag from "@/assets/images/flags/usa-flag.png";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";

const LangToggle = () => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe size={30} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={pathname} locale="en">
          <DropdownMenuItem className="flex items-center" lang={"en"}>
            <Image src={enFlag} alt="EN" width={20} height={20} />
            EN
          </DropdownMenuItem>
        </Link>
        <Link href={pathname} locale="vi">
          <DropdownMenuItem className="flex items-center" lang={"vi"}>
            <Image src={vnFlag} alt="VN" width={20} height={20} />
            VN
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(LangToggle);
