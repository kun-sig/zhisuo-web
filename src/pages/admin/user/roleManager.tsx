import { useEffect, useState } from "react";
import { Button, Drawer, message, Popconfirm, Select, Space, Spin, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { curriculumAPI, type ExamCategorystatistics, type ExamSeriesstatistics, type Subjectstatistics } from "../../../services/curriculum";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Permission, Role } from "../../../services/model";
import CreateRoleDrawer from "./roleDrawer";
import { permissionAPI } from "../../../services/permission";
import RoleDrawer from "./roleDrawer";

// 时间戳转可读时间：输入为秒级 number
const formatTimestamp = (timestamp: number): string => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000); // 转毫秒
    return date.toLocaleString();
};

export default function RoleManager() {
    const [loading, setLoading] = useState(true);
    const [seriesList, setSeriesList] = useState<ExamSeriesstatistics[]>([]);
    const [categoryList, setCategoryList] = useState<ExamCategorystatistics[]>([]);
    const [subjectList, setSubjectList] = useState<Subjectstatistics[]>([]);

    const [selectedSeries, setSelectedSeries] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedSubject, setSelectedSubject] = useState<string>();
    const [enableAdd, setEnableAdd] = useState<boolean>(false);
    const [roles, setRoles] = useState<Role[]>([])

    const [openCreateRole, setOpenCreateRole] = useState(false);
    const [openEditRole, setOpenEditRole] = useState(false);
    const [editingRole, setEditingRole] = useState<Role>();

    const roleColumns: ColumnsType<Role> = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: '系列',
            dataIndex: 'seriesName',
            key: 'seriesName',
            ellipsis: true,
        },
        {
            title: '类别',
            dataIndex: 'categoryName',
            key: 'categoryName',
            ellipsis: true,
        },
        {
            title: '科目',
            dataIndex: 'subjectName',
            key: 'subjectName',
            ellipsis: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
            render: (value: number) => formatTimestamp(value),
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            ellipsis: true,
            render: (value: number) => formatTimestamp(value),
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right' as const,
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="删除权限"
                        description="确定要删除该权限吗？删除后无法恢复。"
                        okText="删除"
                        okType="danger"
                        cancelText="取消"
                        onConfirm={() => {onDeleteRole(record)}}
                    >
                        <Button type="link" danger size="small">
                            删除
                        </Button>
                    </Popconfirm>
                    <Button type="link" size="small" onClick={() => { showEditRoleDrawer(record) }}>
                        编辑
                    </Button>
                </Space>
            ),
        },
    ];

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条记录`,
    });

    function getSubjectNameById(id: string): string {
        const item = subjectList.find(item => item.id === id);
        return item ? item.name : "";
    }
    useEffect(() => {
        curriculumAPI.GetCurriculum().then((res) => {
            setSeriesList(res.series || []);
        }).finally(() => {
            setLoading(false);
            loadData("", "", "");
        });
    }, []);

    const showCreateRoleDrawer = () => {
        setOpenCreateRole(true);
    };
    const showEditRoleDrawer = (role: Role) => {
        setOpenEditRole(true);
        setEditingRole(role);
    };
    const onClose = () => {
        setOpenCreateRole(false);
        setOpenEditRole(false);
    };

    const onDeleteRole = async (role: Role) => {
        await permissionAPI.DeleteRole(role.id??"").then(()=>{
            message.success("已删除!")
        }).catch((e) => {
            message.warning(`删除失败!, ${e}`)
        })
        loadData(selectedSeries ?? "", selectedCategory ?? "", selectedSubject ?? "");
    }

    // 系列切换
    const handleSeriesChange = (value: string) => {
        setSelectedSeries(value);
        const series = seriesList.find(s => s.id === value);
        setCategoryList(series?.categories || []);
        setSelectedCategory("");
        setSelectedSubject("");
        setEnableAdd(false);
        loadData(value, "", "");
    };

    // 类别切换
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        const category = categoryList.find(c => c.id === value);
        setSubjectList(category?.subjects || []);
        setSelectedSubject("");
        setEnableAdd(false);
        loadData(selectedSeries ?? "", value, "");
    };

    // 科目切换
    const handleSubjectChange = (value: string) => {
        setSelectedSubject(value);
        setEnableAdd(true);
        loadData(selectedSeries ?? "", selectedCategory ?? "", value);
    };

    const loadData = (seriesID: string, categoryID: string, subjectID: string) => {
        const { current, pageSize } = pagination;
        permissionAPI.GetRoles(seriesID, categoryID, subjectID, current, pageSize)
            .then((values) => {
                setRoles(values.roles ?? []);
                setPagination(prev => ({ ...prev, total: values.totalSize }));
            });
    }

    if (loading) return <Spin />;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-8">
                <div className="flex flex-row items-center gap-2">
                    <p className="text-base">系列:</p>
                    <Select
                        style={{ width: 120 }}
                        value={selectedSeries}
                        onChange={handleSeriesChange}
                        allowClear
                        options={seriesList.map(s => ({ value: s.id, label: s.name }))}
                    />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-base">类别:</p>
                    <Select
                        style={{ width: 120 }}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        allowClear
                        options={categoryList.map(c => ({ value: c.id, label: c.name }))}
                        disabled={!selectedSeries}
                    />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-base">科目:</p>
                    <Select
                        style={{ width: 180 }}
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        allowClear
                        options={subjectList.map(s => ({ value: s.id, label: s.name }))}
                        disabled={!selectedCategory}
                    />
                </div>
                <Button type="primary" icon={<PlusOutlined />} disabled={!enableAdd} onClick={showCreateRoleDrawer}>
                    新添
                </Button>
            </div>
            <Table
                dataSource={roles}
                columns={roleColumns}
                rowKey="id"
                pagination={pagination}
                onChange={(pagination) => {
                    const { current, pageSize } = pagination;
                    setPagination(prev => ({ ...prev, current, pageSize }));
                    loadData(selectedSeries ?? "", selectedCategory ?? "", selectedSubject ?? "");
                }}
            />
            <Drawer
                title={openCreateRole == true ? "新增角色" : "编辑角色"}
                width={720}
                onClose={onClose}
                destroyOnHidden
                open={openCreateRole || openEditRole}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }} extra={
                    <h1>{getSubjectNameById(selectedSubject ?? "")}</h1>
                }>
                <RoleDrawer subjectID={selectedSubject} isEdit={openEditRole} role={editingRole} onClose={onClose} onUpdate={()=>{loadData(selectedSeries ?? "", selectedCategory ?? "", selectedSubject ?? "")}} ></RoleDrawer>
            </Drawer>
        </div>
    );
}