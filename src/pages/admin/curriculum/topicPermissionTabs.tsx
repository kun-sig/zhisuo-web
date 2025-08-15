// TopicPermissionTabs.tsx
import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Popconfirm, Form, Input, Modal, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { type Permission, type PermissionOption } from '../../../services/model'; // 确保路径正确
import { curriculumAPI, type Topic } from '../../../services/curriculum';
import { permissionAPI } from '../../../services/permission';

const { TabPane } = Tabs;

// 时间戳转可读时间：输入为秒级 number
const formatTimestamp = (timestamp: number): string => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000); // 转毫秒
    return date.toLocaleString();
};

// ✅ 正确定义列类型：ColumnsType<Permission>
const permissionColumns: ColumnsType<Permission> = [
    {
        title: '名称',
        dataIndex: 'optionName',
        key: 'optionName',
        ellipsis: true,
    },
    {
        title: 'URI',
        dataIndex: 'optionUri',
        key: 'optionUri',
        ellipsis: true,
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
    },
    {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        align: 'center',
        width: 100,
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
        width: 100,
        align: 'center',
        fixed: 'right' as const,
        render: (_, record) => (
            <Popconfirm
                title="删除权限"
                description="确定要删除该权限吗？删除后无法恢复。"
                okText="删除"
                okType="danger"
                cancelText="取消"
                onConfirm={() => { }}
            >
                <Button type="link" danger size="small">
                    删除
                </Button>
            </Popconfirm>
        ),
    },
];


interface TopicPermissionTabsProps {
    subjectID: string;
}

/**
 * 权限标签页表格组件
 * 每个 topic 是一个 tab，其 permissions 显示为表格
 */
const TopicPermissionTabs: React.FC<TopicPermissionTabsProps> = ({ subjectID }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    // const [topic, setTopic] = useState<Topic>();
    const [permissionOptions, setPermissionOptions] = useState<PermissionOption[]>([])
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [permissions, setPermissions] = useState<Permission[]>([])

    useEffect(() => {
        if (subjectID.length > 0) {
            curriculumAPI.GetTopicPagination(subjectID, 0, -1).then((value) => {
                setTopics(value.data);
                if (value.data.length > 0) {
                    setActiveTopic(value.data[0]);
                }
            })
        }
    }, [subjectID]); // 当 topicPermissions 变化时，更新 activeTopic

    const setActiveTopic = (item: Topic) => {
        //setTopic(item)
        permissionAPI.GetTopicPermission(item.id).then((value) => {
            setPermissions(value.topicPermission?.permissions ?? []);
        })
    }
    // 打开新增模态框
    const handleAddClick = (item: Topic) => {
        // if (!activeTopicPermission.topicID) return;
        // permissionAPI.GetPermissionOptions().then((value) => {
        //     setPermissionOptions(value.options ?? [])
        // })
        form.resetFields();
        form.setFieldsValue({
            topicID: item.id,
            topicName: item.name,
        });
        setIsModalVisible(true);
        permissionAPI.GetPermissionOptions().then((value) => {
            setPermissionOptions(value.options ?? []);
        })
    };

    // 提交新增权限
    const handleAddSubmit = async () => {
        try {
            const values = await form.validateFields();
            const selectedOption = permissionOptions.find(opt => opt.id === values.name);

            await permissionAPI.CreatePermission(values.topicID, selectedOption?.id!, selectedOption?.name!)
            form.resetFields();
            setIsModalVisible(false);
            message.success("添加成功!")
        } catch (err) {
            message.success(`添加失败!， ${err}`)
        }
    };
    return (
        <div>
            <Tabs defaultActiveKey="0" tabPosition="top" animated onChange={(activeKey) => {
                const index = parseInt(activeKey, 10);
                const selectedTopic = topics[index];
                setActiveTopic(selectedTopic);
            }}>
                {topics?.map((item, index) => (
                    <TabPane tab={item.name} key={index}>
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary" onClick={() => { handleAddClick(item) }}>
                                新增权限
                            </Button>
                        </div>
                    </TabPane>
                ))}
            </Tabs>
            <Table
                dataSource={permissions}
                columns={permissionColumns}
                rowKey="id"
                pagination={{
                    pageSize: 5,
                    showTotal: (total) => `共 ${total} 条记录`,
                }}
                bordered
            />
            {/* 新增权限模态框 */}
            <Modal
                title="新增权限"
                open={isModalVisible}
                onOk={handleAddSubmit}
                onCancel={() => setIsModalVisible(false)}
                okText="提交"
                cancelText="取消"
            >
                <Form form={form} layout="vertical" name="add_permission_form">
                    <Form.Item
                        name="topicID"
                        label="主题ID"
                        rules={[{ required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="topicName"
                        label="主题名称"
                        rules={[{ required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="权限名称"
                        rules={[{ required: true, message: '请选择权限名称' }]}
                    >
                        <Select
                            placeholder="请选择权限类型"
                            options={permissionOptions.map(option => ({
                                label: option.name,
                                value: option.id,
                            }))}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label as string).toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="order"
                        label="排序"
                        initialValue={0}
                    >
                        <Input type="number" placeholder="请输入排序值" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TopicPermissionTabs;