"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
        {t("common.something-missing")}
      </h2>
      <p>{t("common.sorry")}</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          {t("common.go-back")}
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          size="lg"
        >
          {t("common.back-home")}
        </Button>
      </div>
    </div>
  );
}
