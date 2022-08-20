import { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space } from 'antd';
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
              <Button type="primary" icon={<EyeOutlined />} className="mr-3"></Button>
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

function MintRequest() {
  return (
    <div>
      <h1 className="my-4">MINT REQUESTS</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default MintRequest
