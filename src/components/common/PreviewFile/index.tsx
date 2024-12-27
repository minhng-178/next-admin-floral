import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/common";
import { CloudinaryResponse } from "upload";
import { useTranslations } from "next-intl";

interface UploadedFilesCardProps {
  uploadedFiles: CloudinaryResponse[];
}

function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  const t = useTranslations();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("common.uploaded-files")}</CardTitle>
        <CardDescription>
          {t("common.view-the-uploaded-files-here")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => (
                <div key={file.key} className="relative aspect-video w-64">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title={t("common.no-files-uploaded")}
            description={t("common.upload-some-files-to-see-them-here")}
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}

export default React.memo(UploadedFilesCard);
