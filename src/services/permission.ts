// types/permissionTypes.ts

import { http } from "../utils/http";
import type { PaginationRequest } from "./curriculum";
import type { Permission, PermissionOption, Role, TopicPermission } from "./model";
import { urls } from "./urls";

export interface GetPermissionOptionsRequest {
  // 无字段
}

export interface GetPermissionOptionsResponse {
  options?: PermissionOption[];  // repeated PermissionOption = 1
}

export interface CreatePermissionRequest {
  permissions: Permission[];
}

// CreatePermissionResponse 对应的 TS 接口（空消息）
export interface CreatePermissionResponse {
  // 无字段，表示成功即可
}

// CreateRoleRequest 对应的 TypeScript 接口
export interface CreateRoleRequest {
  name?: string;
  foreignID?: string;
  children?: string[];
  permissionIDs?: string[];
}

// CreateRoleResponse 对应的 TypeScript 接口
export interface CreateRoleResponse {
  // 该消息为空，不包含任何字段
}

/**
 * 请求：获取某个 topic 的权限
 */
export interface GetTopicPermissionRequest {
  topicID?: string; // string = 1
}

/**
 * 响应：返回 topic 权限
 */
export interface GetTopicPermissionResponse {
  topicPermission?: TopicPermission;
}

/**
 * 请求：获取 多个topics 的权限
 */
export interface GetTopicsPermissionRequest {
  subjectID?: string; // string = 1
}

/**
 * 响应：返回 topic 权限列表
 */
export interface GetTopicsPermissionResponse {
  topicPermissions?: TopicPermission[];
}

export interface GetRolesRequest {
  name?: string;           // string = 1
  seriesID?: string;       // string = 2
  categoryID?: string;     // string = 3
  subjectID?: string;      // string = 4
  children?: string[];     // repeated string = 5
  pagination?: PaginationRequest; // types.PaginationRequest = 6
}

export interface GetRolesResponse {
  totalSize: number;       // int64 = 1
  roles: Role[];           // repeated types.Role = 2
}

export interface UpdateRoleRequest {
  id: string;
  name: string;
  permissionIDs: string[];
}

export interface UpdateRoleResponse {
}

export interface DeleteRoleRequest {
  id: string;
}

export interface DeleteRoleResponse {
}


class PermissionAPI {
  async GetTopicPermission(topicID: string): Promise<GetTopicPermissionResponse> {
    const body: GetTopicPermissionRequest = {
      topicID: topicID,
    };
    const response = await http.post<GetTopicPermissionResponse>(
      urls.topicPermission,
      body
    );
    return response;
  }
  async GetTopicsPermission(subjectID: string): Promise<GetTopicsPermissionResponse> {
    const body: GetTopicsPermissionRequest = {
      subjectID: subjectID,
    };
    const response = await http.post<GetTopicsPermissionResponse>(
      urls.topicsPermission,
      body
    );
    return response;
  }
  async GetPermissionOptions(): Promise<GetPermissionOptionsResponse> {
    const body: GetPermissionOptionsRequest = {
    };
    const response = await http.post<GetPermissionOptionsResponse>(
      urls.getPermissionOptions,
      body
    );
    return response;
  }
  async CreatePermission(topicID: string, permissionOptionID: string, name: string): Promise<CreatePermissionResponse> {
    const p: Permission = {
      name: name,
      foreignID: topicID,
      optionID: permissionOptionID,
    };
    const body: CreatePermissionRequest = {
      permissions: [p],
    };
    const response = await http.post<CreatePermissionResponse>(
      urls.createPermission,
      body
    );
    return response;
  }
  async CreateRole(subjectID: string, name: string, permissionIDs: string[]): Promise<CreateRoleResponse> {
    const body: CreateRoleRequest = {
      foreignID: subjectID,
      name: name,
      permissionIDs: permissionIDs,
    };
    const response = await http.post<CreateRoleResponse>(
      urls.createRole,
      body
    );
    return response;
  }
  async GetRoles(seriesID?: string, categoryID?: string, subjectID?: string, page?: number, pageSize?: number): Promise<GetRolesResponse> {
    const body: GetRolesRequest = {
      seriesID: seriesID,
      categoryID: categoryID,
      subjectID: subjectID,
      pagination: {
        page: page ?? 0,
        pageSize: pageSize ?? -1,
      }
    };
    const response = await http.post<GetRolesResponse>(
      urls.listRole,
      body
    );
    return response;
  }
  async UpdateRole(id: string, name: string, permissionIDs: string[]): Promise<UpdateRoleResponse> {
    const body: UpdateRoleRequest = {
      id: id,
      name: name,
      permissionIDs: permissionIDs,
    };
    const response = await http.post<UpdateRoleResponse>(
      urls.updateRole,
      body
    );
    return response;
  }
  async DeleteRole(id: string): Promise<DeleteRoleResponse> {
    const body: DeleteRoleRequest = {
      id: id,
    };
    const response = await http.post<DeleteRoleResponse>(
      urls.deleteRole,
      body
    );
    return response;
  }
}

export const permissionAPI = new PermissionAPI();
