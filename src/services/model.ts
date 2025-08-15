export interface Permission {
  id?: string;           // 对应 Go 的 ID (bson:"_id")
  name?: string;         // 对应 Name
  foreignID?: string;    // 对应 ForeignID
  optionID?: string;          // 
  optionName?: string;          // 
  optionUri?: string;          //
  order?: number;        // 对应 Order (int64 -> number)
  createdAt?: number;
  updatedAt?: number;
}

/**
 * 主题权限：包含一个 topic 及其下的多个权限项
 */
export interface TopicPermission {
  topicID?: string;       // string = 1
  topicName?: string;     // string = 2
  permissions?: Permission[]; // repeated Permission = 3
}

export interface PermissionOption {
  id?: string;           // string = 1
  name?: string;         // string = 2
  uri?: string;          // string = 3
  createdAt?: number;    // int64 = 4 (Unix 时间戳，单位：秒)
  updatedAt?: number;    // int64 = 5 (Unix 时间戳，单位：秒)
}

export interface Role {
  id?: string;
  foreignID?: string;
  name?: string;
  // children?: string[];
  permissionIDs?: string[];
  seriesID?: string;
  seriesName?: string;
  categoryID?: string;
  categoryName?: string;
  subjectID?: string;
  subjectName?: string;
  createdAt?: number; 
  updatedAt?: number; 
}

/**
 * 角色信息
 */
export interface RoleInfo {
  roleID: string;
  roleName: string;
  seriesID: string;
  seriesName: string;
  categoryID: string;
  categoryName: string;
  subjectID: string;
  subjectName: string;
}

/**
 * 用户角色信息
 */
export interface UserRoleInfo {
  userID: string;
  roleInfo: RoleInfo;
  startAt: number; // 通常表示时间戳（毫秒）
  endAt: number;   // 通常表示时间戳（毫秒）
  createdAt: number; // 通常表示时间戳（毫秒）
  updatedAt: number; // 通常表示时间戳（毫秒）
}