import { Button, Form, Input, Modal } from "antd";
import Todo from "../../services/api_servises/todo";
import { fetchFormattedData } from "../../model/task";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const { TextArea } = Input;

const CreateSubTask = ({
  subTaskModal = false,
  setSubTaskModal = () => {},
  editedTaskId = null,
  taskTitles = "",
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setSubTaskModal(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: taskTitles,
      subTask: "",
      status: "todo",
      description: "",
    });
  }, []);

  const onFinish = async (values) => {
    const payload = {
      id: editedTaskId,
      title: values.subTask,
      //   status: values.status,
      description: values.description,
    };

    await Todo.createSubTask(payload);
    await fetchFormattedData(dispatch);
    setSubTaskModal(false);
  };

  return (
    <>
      <Modal
        title="Create Sub Task"
        open={subTaskModal}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="taskForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: taskTitles,
            subTask: "",
            status: "todo",
            description: "",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter task title" disabled />
          </Form.Item>
          <Form.Item
            name="subTask"
            label="Sub Task Title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          {/* <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select task status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="todo">Todo</Select.Option>
              <Select.Option value="inprogress">In Progress</Select.Option>
              <Select.Option value="done">Done</Select.Option>
            </Select>
          </Form.Item> */}

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
              Create Sub Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSubTask;
