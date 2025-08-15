// src/api/user.ts

import { http, setTokenGetter } from "../utils/http";
import type { PaginationRequest } from "./curriculum";
import type { UserRoleInfo } from "./model";
import { urls } from "./urls";

export interface GetVerifyCodeRequestion {
    phone: string;
}

export interface GetVerifyCodeResponse {
    duration: number;
    timestamp: number;
    testCode: string;
}

export interface LoginRequest {
    phone: string;
    platformID: number;
    verifyCode: string;
    timestamp: number;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
    isNewUser: boolean;
}

export interface User {
    id: string;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    username: string;
    email: string;
    phone?: string;
    phoneAreaCode?: string;
    fullName?: string;
    avatarUrl?: string;
    gender?: string;
    roleID: string;
    isActivated: boolean;
    lastLoginAt?: number;
    lastLoginIP?: string;
}

export interface GetUsersRequest {
    pagination: PaginationRequest;
    phone?: string;
    fullName?: string;
    username?: string;
}

export interface GetUsersResponse {
    totalSize: number;
    users: User[];
}

export interface CreateUserRoleRequest {
    userID: string;
    roleID: string;
    startAt: number; // 时间戳 (毫秒)
    endAt: number;   // 时间戳 (毫秒)
}

/**
 * 创建用户角色响应 (空响应)
 */
export interface CreateUserRoleResponse {
    // 无字段
}

/**
 * 获取用户角色信息请求
 */
export interface GetUserRoleInfoRequest {
    phone?: string;
}

/**
 * 获取用户角色信息响应
 */
export interface GetUserRoleInfoResponse {
    info: UserRoleInfo[]; // repeated 字段转换为数组
}

/**
 * 删除用户角色请求
 */
export interface DeleteUserRoleRequest {
    id: string;
}

/**
 * 删除用户角色响应 (空响应)
 */
export interface DeleteUserRoleResponse {
    // 无字段
}

/**
 * 更新用户角色请求
 */
export interface UpdateUserRoleRequest {
    id: string;
    endAt: number; // 时间戳 (毫秒)
}

/**
 * 更新用户角色响应 (空响应)
 */
export interface UpdateUserRoleResponse {
    // 无字段
}

class UserAPI {
    private key = "logged";
    private timestamp: number | number = 0;
    constructor() {
        // 注册 token getter 到全局 http 模块
        setTokenGetter(() => this.getToken);
    }

    get loggedInfo(): LoginResponse | null {
        const loggedinfo = localStorage.getItem(this.key)
        if (loggedinfo === null || loggedinfo === "") {
            return null;
        }
        return JSON.parse(loggedinfo)
    }

    logged(): boolean {
        const info = this.loggedInfo
        if (info === null) {
            return false
        }
        return true;
    }

    get getToken(): string | null {
        const info = this.loggedInfo
        if (info === null) {
            return null
        }
        return (info as LoginResponse).token;
    }

    get refreshToken(): string | null {
        const info = this.loggedInfo
        if (info === null) {
            return null
        }
        return (info as LoginResponse).refreshToken;
    }


    async getVerifyCode(phone: string): Promise<GetVerifyCodeResponse> {
        const body: GetVerifyCodeRequestion = { phone };
        const response = await http.post<GetVerifyCodeResponse>(
            urls.getVerifyCode,
            body
        );
        this.timestamp = response.timestamp;
        return response;
    }

    async login(phone: string, verifyCode: string): Promise<User> {
        const body: LoginRequest = { phone: phone, platformID: 0, verifyCode: verifyCode, timestamp: this.timestamp };
        const response = await http.post<LoginResponse>(
            urls.login,
            body
        );
        localStorage.setItem(this.key, JSON.stringify(response));
        return response.user;
    }

    logout() {
        localStorage.removeItem(this.key);
    }

    async getUsers(page: number, pageSize: number): Promise<GetUsersResponse> {
        const request: GetUsersRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
        };
        const response = await http.post<GetUsersResponse>(
            urls.userList,
            request
        );
        return response;
    }

    async createUserRole(userID: string, roleID: string, startAt: number, endAt: number): Promise<CreateUserRoleResponse> {
        const request: CreateUserRoleRequest = {
            userID: userID,
            roleID: roleID,
            startAt: startAt,
            endAt: endAt,
        };
        const response = await http.post<CreateUserRoleResponse>(
            urls.userRole,
            request
        );
        return response;
    }

    async deleteUserRole(userRoleID: string): Promise<DeleteUserRoleResponse> {
        const request: DeleteUserRoleRequest = {
            id: userRoleID,
        };
        const response = await http.post<DeleteUserRoleResponse>(
            urls.userRoleDelete,
            request
        );
        return response;
    }

    async GetUserRoles(phone?: string): Promise<GetUserRoleInfoResponse> {
        const request: GetUserRoleInfoRequest = {
            phone: phone,
        };
        const response = await http.post<GetUserRoleInfoResponse>(
            urls.userRoleDelete,
            request
        );
        return response;
    }

    async UpdateUserRole(userRoleID: string, endAt: number): Promise<UpdateUserRoleRequest> {
        const request: UpdateUserRoleRequest = {
            id: userRoleID,
            endAt: endAt,
        };
        const response = await http.post<UpdateUserRoleRequest>(
            urls.userRoleDelete,
            request
        );
        return response;
    }
}

export const userAPI = new UserAPI();
