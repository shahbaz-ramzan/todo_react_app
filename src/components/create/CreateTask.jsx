import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import Todo from "../../services/api_servises/todo";
import { fetchFormattedData } from "../../model/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const CreateTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state?.tasks?.categoryList);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.setFieldsValue({
      title: "",
      status: "backlog",
      category: "",
      description: "",
    });
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const payload = {
      title: values.title,
      status: values.status,
      description: values.description,
    };
    await Todo.createNewTask(payload);
    await fetchFormattedData(dispatch);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New Task
      </Button>
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
            title: "",
            status: "backlog",
            description: "",
          }}
        >
          {/* Title Field */}
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          {/* Status Field */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select task status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="backlog">Backlog</Select.Option>
              <Select.Option value="todo">Todo</Select.Option>
              <Select.Option value="inprogress">In Progress</Select.Option>
              <Select.Option value="done">Done</Select.Option>
              <Select.Option value="closed">Closed</Select.Option>
            </Select>
          </Form.Item>

          {/* Category Field */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select category">
              {categoryList.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter task description!" },
            ]}
          >
            <TextArea rows={3} placeholder="Enter task description" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
