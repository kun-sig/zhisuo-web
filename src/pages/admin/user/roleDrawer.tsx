import { Button, Checkbox, Col, Form, Input, List, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { permissionAPI } from '../../../services/permission';
import type { Role, TopicPermission } from '../../../services/model';


export default function RoleDrawer({ subjectID = "", isEdit = false, role = {} as Role, onClose = () => { }, onUpdate = () =>{} }) {
    const [topicPermissions, setTopicPermissions] = useState<TopicPermission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({});
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit) {
            subjectID = role.foreignID ?? "";
            form.setFieldsValue({
                name: role.name ?? ""
            });
            if (role.permissionIDs) {
                const newPermissions = Object.fromEntries(
                    role.permissionIDs.map(id => [id, true])
                );
                setSelectedPermissions(prev => ({
                    ...prev,
                    ...newPermissions
                }));
            }
        }
        permissionAPI.GetTopicsPermission(subjectID).then((value) => {
            setTopicPermissions(value.topicPermissions ?? []);
        });
    }, [subjectID, role]);

    const handleCheckboxChange = (permissionId: string) => {
        setSelectedPermissions((prev) => {
            const isChecked = !!prev[permissionId];
            const newValue = !isChecked;
            return {
                ...prev,
                [permissionId]: newValue,
            };
        });
    };

    const handleAddSubmit = async () => {
        const permissionIDs: string[] = Object.entries(selectedPermissions)
            .filter(([_, value]) => value === true)
            .map(([key, _]) => key);
        const values = await form.validateFields();
        if (values.name.length == 0) {
            message.warning("请输入角色名称")
            return;
        }
        if (isEdit) {
            await permissionAPI.UpdateRole(role.id??"", values.name, permissionIDs).then(() => {
                message.success("更新成功!")
            }).catch((e) => {
                message.success(`更新失败!, ${e}`)
            })
        } else {
            await permissionAPI.CreateRole(subjectID, values.name, permissionIDs).then(() => {
                message.success("添加成功!")
            }).catch((e) => {
                message.success(`添加失败!, ${e}`)
            })
        }
        onUpdate()
    }

    return (
        <div className="relative pb-20">
            {/* 表单和列表 */}
            <Form form={form} layout="vertical" name="create_role_drawer_form">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="角色名称"
                            rules={[{ required: true, message: '请输入角色名称' }]}
                        >
                            <Input placeholder="请输入角色名称" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <List
                dataSource={topicPermissions}
                renderItem={(item) => (
                    <List.Item key={item.topicID}>
                        <div className="flex flex-row items-start w-full">
                            <div className="w-36 font-bold text-blue-600 pt-2">
                                {item.topicName}
                            </div>
                            {item.permissions?.length ? (
                                <div className="flex flex-row flex-wrap items-start" style={{ paddingTop: 8 }}>
                                    {item.permissions.map((perm) => (
                                        <div key={perm.id} className="mr-4 mb-1">
                                            <Checkbox
                                                checked={!!selectedPermissions[perm.id!]}
                                                onChange={() => handleCheckboxChange(perm.id!)}
                                            >
                                                {perm.name}
                                            </Checkbox>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-400 pt-2">暂无权限</span>
                            )}
                        </div>
                    </List.Item>
                )}
            />

            {/* 固定底部按钮栏：对齐 Drawer 内容宽度 */}
            <div className="fixed bottom-0 right-0 flex items-center justify-end bg-transparent py-4 px-6">
                <Space>
                    <Button onClick={onClose}>取消</Button>
                    <Button type="primary" onClick={handleAddSubmit}>确认</Button>
                </Space>
            </div>
        </div>
    );
}