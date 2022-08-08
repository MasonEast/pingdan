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
        arr[index]["attenders"]
          ? arr[index]["attenders"].push(v)
          : (arr[index]["attenders"] = [v]);
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
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="参与人" name="attender" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="拼单数量" name="num" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}
