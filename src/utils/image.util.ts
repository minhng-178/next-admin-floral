import { Readable } from "stream";
import { File } from "upload-models";
import { FileWithPath } from "react-dropzone";

export default class ImageUtil {
  static async formatImage(file: FileWithPath): Promise<File> {
    if (!file.path) throw new Error("File path is not defined");
    const buffer = await file.arrayBuffer();
    const stream = new Readable();

    return {
      fieldname: "file",
      originalname: file.name,
      encoding: "7bit",
      mimetype: file.type,
      buffer: Buffer.from(buffer),
      size: file.size,
      stream: stream,
      destination: "",
      filename: file.name,
      path: file.path,
    };
  }

  static async formatImages(files: FileWithPath[]): Promise<File[]> {
    const formattedFiles = await Promise.all(
      files.map(async (file) => {
        if (!file.path) return null;
        const buffer = await file.arrayBuffer();

        return {
          fieldname: "files",
          originalname: file.name,
          encoding: "7bit",
          mimetype: file.type,
          buffer: Buffer.from(buffer),
          size: file.size,
        };
      })
    );

    return formattedFiles.filter((file): file is File => file !== null);
  }
}
