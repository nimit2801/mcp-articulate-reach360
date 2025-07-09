import * as https from "https";
import * as http from "http";
import { URL } from "url";
import { Config, ErrorResponseSchema, type ApiRequestOptions } from "./types";
import { buildPaginationParams } from "./utils/pagination";

export class Reach360Client {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async makeRequest<T>(options: ApiRequestOptions): Promise<T> {
    const { method, endpoint, params, body } = options;
    
    // Build URL with query parameters
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Prepare headers
    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.config.apiKey}`,
      "API-Version": this.config.apiVersion,
      "Content-Type": "application/json",
    };

    // Prepare request body
    const requestBody = body ? JSON.stringify(body) : undefined;
    if (requestBody) {
      headers["Content-Length"] = Buffer.byteLength(requestBody).toString();
    }

    // Make request using Node.js built-in HTTP(S) module
    const isHttps = url.protocol === 'https:';
    const httpModule = isHttps ? https : http;

    return new Promise<T>((resolve, reject) => {
      const req = httpModule.request(url, {
        method,
        headers,
      }, (res) => {
        let responseText = '';
        
        res.on('data', (chunk) => {
          responseText += chunk;
        });
        
        res.on('end', () => {
          let responseData: any;
          
          try {
            responseData = responseText ? JSON.parse(responseText) : {};
          } catch (e) {
            reject(new Error(`Invalid JSON response: ${responseText}`));
            return;
          }

          if (!res.statusCode || res.statusCode >= 400) {
            // Try to parse as error response
            const errorResult = ErrorResponseSchema.safeParse(responseData);
            if (errorResult.success) {
              const errors = errorResult.data.errors.map(e => `${e.code}: ${e.message}`).join(", ");
              reject(new Error(`API Error (${res.statusCode}): ${errors}`));
            } else {
              reject(new Error(`HTTP Error ${res.statusCode}: ${responseText}`));
            }
            return;
          }

          resolve(responseData as T);
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      if (requestBody) {
        req.write(requestBody);
      }
      
      req.end();
    });
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.makeRequest<T>({
      method: "GET",
      endpoint,
      params,
    });
  }

  async post<T>(endpoint: string, body?: any, params?: Record<string, string | number>): Promise<T> {
    return this.makeRequest<T>({
      method: "POST",
      endpoint,
      body,
      params,
    });
  }

  async put<T>(endpoint: string, body?: any, params?: Record<string, string | number>): Promise<T> {
    return this.makeRequest<T>({
      method: "PUT",
      endpoint,
      body,
      params,
    });
  }

  async delete<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.makeRequest<T>({
      method: "DELETE",
      endpoint,
      params,
    });
  }
}
