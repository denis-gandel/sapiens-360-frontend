import FormData from "form-data";

import { BaseService } from "../../bases";
import { fileServerHttp } from "../../../utils/http";

export class FilesService extends BaseService {
  constructor() {
    super("files", fileServerHttp);
  }

  public async uploadFile(file: File, ownerId: string, tenantId: string) {
    const formData = new FormData();
    const buffer = Buffer.from(await file.arrayBuffer());

    formData.append("file", buffer, {
      filename: file.name || "upload.dat",
      contentType: file.type || "application/octet-stream",
    });

    const params: Record<string, string> = { tenantId, ownerId };

    const response = await this.http.post(this.url("upload"), formData, {
      headers: formData.getHeaders(),
      params,
    });

    return response.data;
  }
}
