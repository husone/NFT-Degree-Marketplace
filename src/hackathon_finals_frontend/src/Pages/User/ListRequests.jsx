import { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Tag, Modal, Form, Input } from 'antd';
import styled from "styled-components";
import './index.scss'
function ListRequests() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => {
                let color = 'green';
                if (status === "Deny") {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={status}>
                        {status}
                    </Tag>
                );
            }
        },
        {
            title: 'Preview',
            key: 'preview',
            dataIndex: 'preview',
            render: () => <Button type="primary" onClick={showModal} icon={<EyeOutlined />} className="mr-3"></Button>,
        },
    ];

    const data = [
        {
            school: 'DE160000',
            fullname: 'John Brown',
            timestamp: "07302022",
            status: "Accept"
        },
        {
            school: 'DE160002',
            fullname: 'Jim Green',
            timestamp: "07302022",
            status: "Accept"
        },
        {
            school: 'DE160003',
            fullname: 'Joe Black',
            timestamp: "07302022",
            status: "Deny"
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <h2 className="my-4">LIST OF USER'S REQUEST</h2>
            <Table columns={columns} dataSource={data} />

        </div>
    );
}

export default ListRequests;