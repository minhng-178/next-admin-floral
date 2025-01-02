import React from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/helpers";
import UploadService from "@/services/upload.service";
import { CloudinaryResponse } from "upload";

export function useUploadFile({ defaultUploadedFiles = [] }) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<CloudinaryResponse[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    const uploadService = new UploadService();

    try {
      const res: CloudinaryResponse[] = await uploadService.uploadMultipleFiles(
        files,
        (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (!total) return 0;
          const progress = Math.round((loaded * 100) / total);
          setProgresses((prev) => {
            const updatedProgresses = { ...prev };
            files.forEach((file) => {
              updatedProgresses[file.name] = progress;
            });
            return updatedProgresses;
          });
        }
      );

      setUploadedFiles(res);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}
