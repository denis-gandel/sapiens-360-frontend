import axios from "axios";
import FormData from "form-data";

export class FilesService {
  private readonly API_URL = `${import.meta.env.VITE_FILE_SERVER_URL}files`;

  public async uploadFile(file: File, ownerId: string, tenantId: string) {
    const formData = new FormData();

    const buffer = Buffer.from(await file.arrayBuffer());

    formData.append("file", buffer, {
      filename: file.name || "upload.dat",
      contentType: file.type || "application/octet-stream",
    });

    const response = await axios.post(
      `${this.API_URL}/upload?tenantId=${tenantId}&ownerId=${ownerId}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data;
  }
}
