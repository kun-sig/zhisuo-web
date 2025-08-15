import { API_BASE_URL } from "../config/env";

const DEFAULT_TIMEOUT = 10000; // 10秒
type TokenGetter = () => string | null;

export class AppError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.name = 'AppError';

        // 修复原型链（针对 ES5 环境或 Babel 转译）
        Object.setPrototypeOf(this, AppError.prototype);
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
        };
    }
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

interface RequestOptions extends RequestInit {
    timeout?: number;
    headers?: Record<string, string>;
    skipAuth?: boolean; // 是否跳过 Token 注入
}

export function setTokenGetter(fn: TokenGetter) {
    http.getToken = fn;
}

export const http = {
    baseURL: API_BASE_URL,
    getToken: undefined as TokenGetter | undefined,

    async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
        const { timeout = DEFAULT_TIMEOUT, skipAuth, headers, ...rest } = options;

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        // 自动拼接 baseURL，避免重复斜杠
        const finalUrl = url.startsWith('http') ? url : `${this.baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;

        const finalHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...headers,
        };

        if (!skipAuth) {
            const token = http.getToken?.(); // 此处回调获取 token
            if (token) {
                finalHeaders['token'] = `${token}`;
            }
        }

        try {
            const response = await fetch(finalUrl, {
                ...rest,
                headers: finalHeaders,
                signal: controller.signal,
            });

            clearTimeout(timer);
            const contentType = response.headers.get('content-type') || '';

            if (!response.ok) {
                const errorText = await response.text();
                throw new AppError(response.status, errorText || `请求失败，状态码：${response.status}`);
            }

            if (contentType.includes('application/json')) {
                const json = await response.json() as ApiResponse<T>;
                if (json.code !== 0) {
                    throw new AppError(json.code, json.message || '接口调用失败');
                }
                return json.data;
            }

            // 若不是 json，返回 blob
            return response.blob() as unknown as T;

        } catch (error) {
            clearTimeout(timer);
            if (error instanceof AppError) throw error;
            // 网络错误/Abort 等统一封装为 AppError
            throw new AppError(-10000, (error as Error).message || '网络异常');
        }
    },

    get<T>(url: string, options?: RequestOptions) {
        return this.request<T>(url, { ...options, method: 'GET' });
    },

    post<T>(url: string, body?: any, options?: RequestOptions) {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    put<T>(url: string, body?: any, options?: RequestOptions) {
        return this.request<T>(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    delete<T>(url: string, options?: RequestOptions) {
        return this.request<T>(url, { ...options, method: 'DELETE' });
    },

    // 文件上传
    upload<T>(url: string, formData: FormData, options?: RequestOptions) {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            body: formData,
            headers: {
                ...(options?.headers || {}),
                // 自动识别 FormData，不设置 Content-Type
            },
        });
    },

    // 文件下载
    async download(url: string, filename: string, options?: RequestOptions) {
        const blob = await this.request<Blob>(url, { ...options, method: 'GET' });
        const link = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
    },
};