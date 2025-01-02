import { http } from "@/configs";
import { uploadPath } from "@/constants";
import { AxiosProgressEvent } from "axios";
import { CloudinaryResponse } from "upload";

export default class UploadService {
  async uploadSingleFile(
    file: File,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<CloudinaryResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return (
      await http.post(uploadPath.SINGLE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })
    ).data;
  }

  async uploadMultipleFiles(
    files: File[],
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<CloudinaryResponse[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return (
      await http.post(uploadPath.MULTIPLE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })
    ).data;
  }
}
