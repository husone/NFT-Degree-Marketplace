import { Tabs, Tag, Divider } from "antd";
import MyNFTItem from "./MyNFTItem";

const { TabPane } =  Tabs;

function MyNFT() {
  const onChange = (key) => {
    console.log(key);
  }
  return (
    <div>
      <h1 className="my-4">ACCOUNT'S NFT</h1>
      <div className="wrap_account">
        <img src="" alt="" />
      </div>
      <Tag color="green">Verified</Tag>
      <Divider orientation="left">Account</Divider>
      <p>{"replace this line by wallet ID"}</p>

      <Tabs className="mt-4" defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Collected" key="1" className="my-5">
          {/* map here for items */}
          <MyNFTItem university="FPT University" rollNumber="122141"/>
        </TabPane>
        <TabPane tab="Created" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Favorite" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MyNFT
