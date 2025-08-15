import { useState } from "react";
import { Button } from "antd";

// 定义按钮项的类型
export interface LableButtonOption {
    id: string;
    groupID?: string;
    name: string;
    order?: number;
}
export function getGroupLableButtonOptions(options: LableButtonOption[], groupID: string): LableButtonOption[] {
  return options.filter(item => item.groupID === groupID);
}

// 定义组件 Props 类型
interface LabelButtonGroupProps {
    options: LableButtonOption[];
    onClick?: (item: LableButtonOption) => void;
}

export default function LableButtonGroup({
    options = [],
    onClick,
}: LabelButtonGroupProps) {
    const [selectedId, setSelectedId] = useState<string | number | null>(options[0]?.id ?? null);

    const handleClick = (item: LableButtonOption) => {
        console.log(`${item.id}`);
        setSelectedId(item.id);
        onClick?.(item);
    };

    return (
        <div className="flex flex-row gap-4">
            {options.map((item) => (
                <Button
                    key={item.id}
                    color="default"
                    variant={selectedId === item.id ? "solid" : "filled"}
                    onClick={() => handleClick(item)}
                >
                    {item.name}
                </Button>
            ))}
        </div>
    );
}