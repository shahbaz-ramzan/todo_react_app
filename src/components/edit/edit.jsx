import { Button, Form, Input, Modal, Select } from "antd";
import Todo from "../../services/api_servises/todo";
import { fetchFormattedData } from "../../model/task";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const EditTaskModal = ({
  isModalOpen = false,
  setIsModalOpen = () => {},
  editedTaskId = null,
}) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state?.tasks?.categoryList);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const payload = {
      id: editedTaskId,
      title: values.title,
      status: values.status,
      description: values.description,
    };

    await Todo.updateTask(payload);
    await fetchFormattedData(dispatch);
    setIsModalOpen(false);
  };

  const getTaskById = async (taskId) => {
    if (!taskId) return;

    const res = await Todo.getTaskById({ id: taskId });
    if (res?.data) {
      form.setFieldsValue({
        title: res.data.title,
        status: res.data.status,
        category: res.data.category,
        description: res.data.description,
      });
    }
  };

  useEffect(() => {
    getTaskById(editedTaskId);
  }, [editedTaskId]);

  return (
    <>
      <Modal
        title="Edit Task"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="taskForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: "",
            status: "backlog",
            description: "",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

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

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter task description!" },
            ]}
          >
            <TextArea rows={3} placeholder="Enter task description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTaskModal;
