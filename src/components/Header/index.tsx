import { Button, Form, Popconfirm } from "antd";
import { useState } from "react";

import OrderModal from "../OrderModal";

export default function Header({ setOrders }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
  };

  const confirm = () => {
    // fetch("/api/clear");
    setOrders([]);
  };

  return (
    <div className="header">
      <span className="header_order_btn" onClick={handleClick}>
        发起拼单
      </span>
      <Popconfirm
        title="请确定是否已完成结算，确定将清空所有数据！"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="header_res_btn">完成结算</span>
      </Popconfirm>

      <OrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setOrders={setOrders}
      />
    </div>
  );
}
