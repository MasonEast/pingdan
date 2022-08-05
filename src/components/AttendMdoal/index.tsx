import { Form, Input, InputNumber, Modal } from "antd";

export default function AttendModal({
  modalVisible,
  setModalVisible,
  setOrders,
  order,
}: any) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((v) => {
      setOrders((data: any) => {
        const arr = [...data];
        const index = arr.findIndex((item: any) => item.type === order.type);
        if (index === -1) {
          return [
            ...arr,
            {
              ...order,
              attenders: [v],
            },
          ];
        }
        arr[index]["attenders"].push(v);
        return arr;
      });
      setModalVisible(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      title="参与拼单"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item label="参与人" name="attender">
          <Input />
        </Form.Item>
        <Form.Item label="拼单数量" name="num">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}
