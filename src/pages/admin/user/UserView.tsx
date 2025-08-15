import { Button, Space, Table, Tag } from 'antd';
import type { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { convertTimestampToLocalTime } from '../../../utils/time';
import { useEffect, useState } from 'react';
import type { SorterResult } from 'antd/es/table/interface';
import { userAPI, type User } from '../../../services/user';

const columns: TableProps<User>['columns'] = [
    {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '激活状态',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (_, record) => (
            record.isActivated ? <Tag color="green">
                激活
            </Tag> : <Tag color="volcano">
                锁定
            </Tag>
        ),
    },
    {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (time) => <div>{convertTimestampToLocalTime(time)}</div>,
    },
    {
        title: '最近登录IP',
        dataIndex: 'lastLoginIP',
        key: 'lastLoginIP',
    },
    {
        title: '最近登录时间',
        dataIndex: 'lastLoginAt',
        key: 'lastLoginAt',
        render: (time) => <div>{convertTimestampToLocalTime(time)}</div>,
    },
    {
        title: '操作',
        width: 180,
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                {record.isActivated ? <Button color="danger" variant="text">
                    锁定账号
                </Button> : <Button color="primary" variant="text">
                    激活账号
                </Button>}
                <Button color="primary" variant="text">
                    权限配置
                </Button>
            </Space>
        ),
    },
];

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export default function UserOverview() {
    const [data, setData] = useState<User[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleTableChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const fetchData = () => {
        setLoading(true);

        userAPI.getUsers(tableParams.pagination?.current ?? 1, tableParams.pagination?.pageSize ?? 25).then((res) => {
            setData(res.users);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.totalSize,
                },
            });
            setLoading(false);
        }).finally(() => {
            setLoading(false)
        });
    };

    useEffect(fetchData, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    return (
        <div className='w-full h-full'>
            <Table<User> columns={columns} dataSource={data} className='border-0' rowKey={(record) => record.id}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange} />
            {/* <Table<DataType> columns={columns} dataSource={data} className='border-0' /> */}
        </div>
    );
}