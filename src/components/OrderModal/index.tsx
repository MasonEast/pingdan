import { Form, Input, Modal } from "antd";

export default function OrderModal({
  modalVisible,
  setModalVisible,
  setOrders,
}: any) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((v) => {
      setOrders((data: any) => {
        return [...data, v];
      });
      setModalVisible(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      title="发起拼单"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} form={form}>
        <Form.Item label="发起人" name="user" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="品种" name="type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="单价" name="price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="实际单价" name="realPrice">
          <Input />
        </Form.Item>
        <Form.Item label="拼单目标" name="target" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
