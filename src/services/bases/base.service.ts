import { type AxiosInstance } from "axios";
import { Toaster } from "../../utils/toaster";
import type { IService } from "../contracts";

export abstract class BaseService implements IService {
  protected baseUrl: string;
  protected http: AxiosInstance;
  protected toaster: Toaster = new Toaster();

  constructor(baseUrl: string, http: AxiosInstance) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.http = http;
  }

  protected url(path: string = "") {
    if (!path) return this.baseUrl;
    return `${this.baseUrl}/${path.replace(/^\/+/, "")}`;
  }
}
