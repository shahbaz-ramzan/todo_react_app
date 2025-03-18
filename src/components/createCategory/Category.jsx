import { Button, Form, Input, Modal } from "antd";
import Category from "../../services/api_servises/category";

const CreateCategoryModal = ({
  setIsModalOpen = () => {},
  fetchCategoryList = () => {},
  isModalOpen = false,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const payload = {
      category: values.category,
    };
    await Category.createNewTask(payload);
    fetchCategoryList();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create New Task"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="taskForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            category: "",
          }}
        >
          {/* category Field */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter  category!" }]}
          >
            <Input placeholder="Enter  category" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add New Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;
