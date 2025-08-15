import { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export interface CategoryCardProps {
    id?: string;
    name?: string;
    selected?: boolean;
    isAdd?: boolean;
    onClick?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
    onAdd?: () => void;
}

export default function CategoryCard({
    id,
    name,
    selected = true,
    isAdd = false,
    onClick,
    onDelete,
    onEdit,
    onAdd,
}: CategoryCardProps) {
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (onClick) onClick(id ?? "");
    };
    const handleDelete = () => {
        if (onDelete) onDelete(id ?? "");
    };
    const handleEdit = () => {
        if (onEdit) onEdit(id ?? "");
    };
    const handleOnAdd = () => {
        if (onAdd) onAdd();
    };

    if (isAdd) {
        return (
            <div
                className="flex flex-col items-center justify-center
                    w-[110px] h-[83px] rounded border-[0.6px] border-gray-200 shadow
                    bg-white cursor-pointer transition-shadow hover:shadow-2xl"
                onClick={handleOnAdd}
            >
                <PlusOutlined style={{ fontSize: 20, color: '#6a7282' }} />
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col
                min-w-[130px] w-[130px] rounded border-[0.6px] border-gray-200 shadow
                bg-white transition-shadow hover:shadow-lg overflow-hidden`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* 标题区域 */}
            <div
                className={`flex w-full justify-center items-center p-2 
                    cursor-pointer border-b border-gray-200 transition duration-200
                    ${selected
                        ? 'bg-blue-500 text-white hover:shadow-md active:bg-blue-300'
                        : 'bg-gray-200 text-black hover:shadow-md active:bg-blue-300 active:text-white'}`}
                onClick={handleClick}
            >
                <h1 className="select-none">{name}</h1>
            </div>

            {/* 工具栏，仅在 selected && hovered 时显示 */}
            {selected && hovered && (
                <div className="flex w-full justify-between items-center mt-1">
                    <div className="flex w-full justify-center items-center">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={handleEdit}
                        />
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <Popconfirm
                            title="确定删除吗？"
                            description="删除后无法恢复"
                            onConfirm={handleDelete}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="text"
                                shape="circle"
                                danger
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </div>
                </div>
            )}
        </div>
    );
}
