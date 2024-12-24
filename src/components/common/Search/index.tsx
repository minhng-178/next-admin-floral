"use client";

import { Search } from "lucide-react";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SpinnerIcon } from "@/assets/icons";
import { usePathname } from "@/i18n/routing";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const searchAction = (formData: FormData) => {
    const value = formData.get("q") as string;
    const params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`${pathname}/?${params.toString()}`);
    });
  };

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder={props.placeholder}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px]"
      />
      {isPending && <SpinnerIcon />}
    </form>
  );
};

export default React.memo(SearchInput);
