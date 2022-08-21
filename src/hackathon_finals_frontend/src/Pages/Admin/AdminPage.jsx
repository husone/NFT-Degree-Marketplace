import { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Tag } from 'antd';
import styled from "styled-components";

function AdminPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
      key: 'taxCode',
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
      render: (_, {status}) => {
        let color = "green";
        if(status === "Deny") {
          color = "volcano"
          return <Tag color={color}>Deny</Tag>
        }
        return <Tag color={color}>Accept</Tag>
      }
    },
    {
      title: 'Preview',
      key: 'preview',
      dataIndex: 'preview',
      render: () => <Button type="primary" onClick={showModal} icon={<EyeOutlined />} className="mr-3"></Button>
    },
  ];
  const data = [
    {
      taxCode: 'ax01shax',
      name: 'John Brown',
      timestamp: "07302022",
      status: "Deny"
    },
    {
      taxCode: 'ax01shax',
      name: 'Jim Green',
      timestamp: "07302022",
      status: "Accept"
    },
    {
      taxCode: 'ax01shax',
      name: 'Joe Black',
      timestamp: "07302022",
      status: "Accept"
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
      <h2 className="my-4">MINTED REQUESTS</h2>
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
              label="Center name"
              name="name"
            >
              <Input
                type="text"
                id="name"
                value={"center name here"}
              />
            </Form.Item>

            <Form.Item
              label="Tax code"
              name="taxCode"
            >
              <Input
                value={"temp tax code"}
              />
            </Form.Item>

            <Form.Item
              label="Legal Representative"
              name="legalRepresentative"
            >
              <Input value={"temp legal representativve"} />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
            >
              <Input value={"temp address"} />
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
  )
}

export default AdminPage;


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