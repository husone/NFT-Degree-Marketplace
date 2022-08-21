import { Card, Modal, Button, Space } from 'antd';
import React, { useState } from 'react';
import styled from "styled-components"

const { Meta } = Card;

export default function ({ university, rollNumber }) {
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
    return (
        <Container>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                onClick={showModal}
            >
                <Meta title={university} description={rollNumber} />
            </Card>
            <Modal title="NFT IN DETAIL" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Space size={15} className="d-flex mb-4">
                    <WrapImage className="wrap_img">
                        {
                            false && // replace false by img uri
                            <img src="" alt="" />
                        }
                    </WrapImage>
                    <div>
                        <h3>Education name #ID</h3>
                        <h3>Owner's principle</h3>
                        <h3>$ Price</h3>
                    </div>
                </Space>
                <Button type="primary">Buy NFT</Button>
                <Button type="primary">Transfer</Button>
                <Button type="primary">Set price</Button>
            </Modal>
        </Container>
    )
}

const Container = styled.div`
    img{
        object-fit: cover;
    }
`;

const WrapImage = styled.div`
    width: 200px;
    height: 200px;
    border: 1px dashed #ccc;
    border-radius: 8px;
    img{
        width: 100%;
        height: 100%;
    }
`;