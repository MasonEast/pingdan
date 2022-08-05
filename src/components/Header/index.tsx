import { Button, Form } from "antd";
import { useState } from "react";

import OrderModal from "../OrderModal";

export default function Header({ setOrders }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
  };

  return (
    <div className="header">
      <span className="header_btn" onClick={handleClick}>
        发起拼单
      </span>
      <OrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setOrders={setOrders}
      />
    </div>
  );
}
