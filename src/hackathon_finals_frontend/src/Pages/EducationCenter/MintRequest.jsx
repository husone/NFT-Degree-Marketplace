import { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Modal, Form, Input } from 'antd';
import styled from "styled-components";

function MintRequest() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
      render: (text) => <a>{text}</a>,
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
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, { actions }) => (
        <Space size={8}>
          {
            actions.map(action => {
              if (action === "preview") return (
                <Button type="primary" onClick={showModal} icon={<EyeOutlined />} className="mr-3"></Button>
              )
              else return (
                <Button type="danger" icon={<DeleteOutlined />}></Button>
              )
            })
          }
        </Space >
      )
    },
  ];
  const data = [
    {
      studentId: 'DE160000',
      fullname: 'John Brown',
      timestamp: "07302022",
      actions: ['preview', 'delete'],
    },
    {
      studentId: 'DE160002',
      fullname: 'Jim Green',
      timestamp: "07302022",
      actions: ['preview', 'delete'],
    },
    {
      studentId: 'DE160003',
      fullname: 'Joe Black',
      timestamp: "07302022",
      actions: ['preview', 'delete'],
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
    <Container>
      <h1 className="my-4">MINT REQUESTS</h1>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="User KYC to mint NFT"
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
          <div className="wrap_img" style={{ width: "350px", height: "350px", borderRadius: "8px", border: "1px dashed #ccc" }}>
            <img src="" alt="" srcset="" />
          </div>
        </div>
      </Modal>
    </Container>
  )
}

export default MintRequest;


const Container = styled.div`
`;