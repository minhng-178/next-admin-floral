import { http } from "@/configs";
import { uploadPath } from "@/constants";
import { AxiosProgressEvent } from "axios";
import { CloudinaryResponse } from "upload";

export default class UploadService {
  async uploadSingleFile(
    file: any,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<CloudinaryResponse> {
    return await http.post(uploadPath.SINGLE, file, {
      onUploadProgress,
    });
  }

  async uploadMultipleFiles(
    files: any,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<CloudinaryResponse[]> {
    return await http.post(uploadPath.MULTIPLE, files, {
      onUploadProgress,
    });
  }
}
