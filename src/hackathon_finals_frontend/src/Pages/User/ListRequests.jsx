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

            <Modal
                title="Minted NFT"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <div className="d-flex justify-content-between">
                    <Form
                        encType="multipart/form-data"
                        style={{ maxWidth: '60vw', margin: '0px auto' }}
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 20 }}
                        disabled
                    >
                        <Form.Item
                            label="First name"
                            name="firstName"
                        >
                            <Input
                                type="text"
                                id="firstName"
                                value={"temp first name"}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Last name"
                            name="lastName"
                        >
                            <Input
                                value={"temp last name"}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Date of Birth"
                            name="dob"
                        >
                            <Input value={"temp date of birth"} />
                        </Form.Item>

                        <Form.Item
                            label="Education center"
                            name="educationCenter"
                        >
                            <Input value={"temp education center"} />
                        </Form.Item>

                        <Form.Item
                            label="Nation ID Number"
                            name="nationIdNumber"
                        >
                            <Input value={"temp nation id number"} />
                        </Form.Item>

                        <Form.Item
                            label="Student ID"
                            name="studentId"
                        >
                            <Input value={"temp student id"} />
                        </Form.Item>

                        <Form.Item
                            label="Name of Certificate"
                            name="nameOfCertificate"
                        >
                            <Input value={"temp name of certificate"} />
                        </Form.Item>
                    </Form>
                    <Container className="wrap_img">
                        {
                            false && // render image if exist, replace false by uri
                            <img src="" alt="preview image" srcset="" />
                        }
                    </Container>
                </div>
            </Modal>
        </div>
    );
}

export default ListRequests;

const Container = styled.div`
    width: 350px;
    height: 350px;
    border-radius: 8px;
    border: 1px dashed #ccc;
    overflow: hidden;
    img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
`;