import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Input, Form, Tag, Space, Divider, Modal, Alert } from "antd";
import styled from "styled-components";
import { ExclamationCircleOutlined } from "@ant-design/icons"
import "./DetailNFT.scss"

const { confirm } = Modal;

function DetailNFT() {
  const [action, setAction] = useState("");
  const [isPublic, setPublic] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const showConfirm = () => {
    confirm({
      title: 'Do you Want to set public this item?',
      icon: <ExclamationCircleOutlined />,
      content: "You can't change item to private after set public",
      onOk() {
        setPublic(true)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <Container className="mt-5">
        <div className="row">
          <div className="col">
            <div className="img_wrapper">
              {
                false &&// replace false by uri
                <img src="" alt="item" />
              }
            </div>
          </div>
          <div className="col">
            <Form>
              <Form.Item
                label="Education"
              >
                <h1>{"#NFT id"}</h1>
              </Form.Item>
              <div className="row">
                <div className="col">
                  <Form.Item
                    label="Status"
                  >
                    {
                      !isPublic && // replace true by is private
                      <Tag color="gold">Private</Tag>
                    }
                    {
                      isPublic && // replace false by is public
                      <Tag color="cyan">Public</Tag>
                    }
                  </Form.Item>
                </div>
                {
                  true && // replace true by is private
                  <div className="col">
                    <Button type="primary" onClick={showConfirm}>Set public</Button>
                  </div>
                }
              </div>
              <div className="row">
                <div className="col">
                  <Form.Item label="$Price">
                    <Input type="text" />
                  </Form.Item>
                </div>
                <div className="col">
                  <Button type="primary" onClick={showModal}>Transfer</Button>
                </div>
              </div>
              <Form.Item
                label="List of viewer"
              >
                <div className="row">
                  <div className="col">
                    <Space size={15}>
                      <Button type="primary" onClick={() => setAction("Add")}>Add</Button>
                      <Button type="primary" onClick={() => setAction("Remove")}>Remove</Button>
                      <Button type="primary">Remove at</Button>
                    </Space>
                  </div>
                  <div className="col"></div>
                </div>
                {
                  action !== "" &&
                  <>
                    <Divider orientation="left">
                      {action} viewer:
                    </Divider>
                    <div className="row">
                      <div className="col">
                        <Input type="text" placeholder="#Id of viewer" />
                      </div>
                      <div className="col">
                        <Button type="primary" onClick={() => setAction("")}>Done</Button>
                      </div>
                    </div>
                  </>
                }
              </Form.Item>
            </Form>
          </div>
        </div>

        <Modal title="Transfer NFT" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <ImageWrapper>
            {
              false &&// replace false by uri
              <img src="" alt="item" />
            }
          </ImageWrapper>
          <Form.Item
            className="mt-5"
            label="Recipient wallet id"
          >
            <Input type="text" />
          </Form.Item>
        </Modal>
      </Container >
    </>
  )
}

export default DetailNFT
const Container = styled.div`
  .img_wrapper{
    width: 350px;
    height: 350px;
    border-radius: 8px;
    border: 1px dashed #ccc;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
`;